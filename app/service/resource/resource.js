const { ipcMain } = require('electron');
const { Op } = require('sequelize');
const Resource = require('../../store/models/resources/resource-model');
class ResourceService {
    constructor() {}

    handle() {
        this.getAll();
        this.deleteType();
        this.edit();
        this.addType();
        this.addResource();
    }

    edit() {
        ipcMain.handle('edit', async (event, typeId, field, value) => {
            try {
                console.log('EDITIING', typeId, field, value);
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
                console.log('adding ', resource);
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

    addType() {
        ipcMain.handle('add-resource-type', async (event, code, type) => {
            try {
                const created = await Resource.create({ code: code, type: type });

                return { status: 'success', message: 'Code ajoute !', id: created.id };
            } catch (err) {
                return this.errorStatus(err);
            }
        });
    }

    deleteType() {
        ipcMain.handle('delete-type', async (event, typeId) => {
            try {
                console.log('deleteing this bitch');
                await Resource.destroy({ where: { [Op.or]: [{ id: typeId }, { ResourceId: typeId }] } });

                return { status: 'success', message: 'Type supprime !' };
            } catch (err) {
                return this.errorStatus(err);
            }
        });
    }

    // addResource() {
    //     ipcMain.handle('add-resource', async (event, resource, parentId) => {
    //         try {
    //             const parentType = await Resource.findByPk(parentId);

    //             console.log(parentType);

    //             if (!parentType) return { status: 'error', message: 'Erreur' };

    //             const newResource = await parentType.createResource(resource);

    //             if (!newResource) return { status: 'error', message: 'Erreur' };

    //             return { status: 'success', message: 'Resource ajoute !' };
    //         } catch (err) {
    //             return this.errorStatus(err);
    //         }
    //     });
    // }

    getAll() {
        ipcMain.handle('get-all', async (e, type) => {
            try {
                const resources = await Resource.findAll({ where: { type: type } });

                let hmap = {};

                resources.forEach((res) => {
                    hmap[res.id] = res.toJSON();

                    if (!res.unit) hmap[res.id]._children = [];
                });
                let result = [];

                resources.forEach((res) => {
                    if (res.ResourceId) {
                        hmap[res.ResourceId]._children.push(hmap[res.id]);
                    } else {
                        result.push(hmap[res.id]);
                    }
                });

                return JSON.parse(JSON.stringify(result));
            } catch (err) {
                return this.errorStatus(err);
            }
        });
    }

    errorStatus(err) {
        if (err.stack.includes('SequelizeUniqueConstraintError')) return { status: 'error', message: 'La ressource existe deja' };
        return { status: 'error', message: 'Erreur' };
    }
}

module.exports = ResourceService;
