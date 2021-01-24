const { ipcMain } = require('electron');
const { Op } = require('sequelize');
const Resource = require('../../store/models/resources/resource-model');
class ResourceService {
    constructor() {}

    handle() {
        this.getAll();
        this.delete();
        this.edit();
        this.addFolder();
        this.addResource();
        this.getAllTree();
    }

    edit() {
        ipcMain.handle('edit', async (event, typeId, field, value) => {
            try {
                const typeToEdit = await Resource.findByPk(typeId);

                if (!typeToEdit) return { status: 'error', message: 'Erreur' };

                const saved = await typeToEdit.set(field, value).save();

                if (!saved) return { status: 'error', message: 'Erreur' };

                return { status: 'success', message: 'Type modifie !' };
            } catch (err) {
                return this.errorStatus(err);
            }
        });
    }

    addResource() {
        ipcMain.handle('add-resource', async (event, resource, parentId) => {
            try {
                const [instance, created] = await Resource.findOrCreate({ where: { id: parentId }, defaults: { ...resource } });

                if (created) return { status: 'success', message: 'Resource ajoute !', resource: instance.toJSON() };

                if (!instance) return { status: 'error', message: 'Erreur' };

                const newResource = await instance.createResource(resource);

                if (!newResource) return { status: 'error', message: 'Erreur' };

                return { status: 'success', message: 'Resource ajoute !', resource: newResource.toJSON() };
            } catch (err) {
                return this.errorStatus(err);
            }
        });
    }

    addFolder() {
        ipcMain.handle('add-resource-folder', async (event, code, type) => {
            try {
                const created = await Resource.create({ code: code, type: type });

                return { status: 'success', message: 'Code ajoute !', id: created.id };
            } catch (err) {
                return this.errorStatus(err);
            }
        });
    }

    delete() {
        ipcMain.handle('delete-resource', async (event, id) => {
            try {
                await Resource.destroy({ where: { [Op.or]: [{ id: id }, { ResourceId: id }] } });

                return { status: 'success', message: 'Type supprime !' };
            } catch (err) {
                return this.errorStatus(err);
            }
        });
    }

    async _getAll(type) {
        try {
            const resources = await Resource.findAll({ where: { type: type } });

            let hmap = {};

            resources.forEach((res) => {
                hmap[res.id] = res.toJSON();
                if (!res.unit) hmap[res.id].children = [];
            });

            let result = [];

            resources.forEach((res) => {
                if (res.ResourceId) {
                    hmap[res.ResourceId].children.push(hmap[res.id]);
                } else {
                    result.push(hmap[res.id]);
                }
            });

            return JSON.parse(JSON.stringify(result));
        } catch (err) {
            return this.errorStatus(err);
        }
    }

    getAll() {
        ipcMain.handle('get-all', async (e, type) => {
            try {
                return await this._getAll(type);
            } catch (err) {
                return this.errorStatus(err);
            }
        });
    }

    getAllTree() {
        ipcMain.handle('get-all-tree', async () => {
            try {
                const types = { W: "Main d'oeuvre", M: 'Materiaux', D: 'Divers', C: 'Sous-traitant', V: 'Vrac', E: 'Equipements' };
                let tree = [];

                for (const [key, value] of Object.entries(types)) {
                    const subTree = await this._getAll(key);
                    tree.push({ code: value, children: subTree });
                }
                return tree;
            } catch (err) {
                return this.errorStatus(err);
            }
        });
    }

    errorStatus(err) {
        console.log(err);
        if (err.stack.includes('SequelizeUniqueConstraintError')) return { status: 'error', message: 'La ressource existe deja' };
        return { status: 'error', message: 'Erreur' };
    }
}

module.exports = ResourceService;
