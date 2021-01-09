const { ipcMain } = require('electron');
const EquipementDetail = require('../../store/models/resources/equipements-detail');
const Resource = require('../../store/models/resources/resource-model');

class EquipementService {
    constructor() {}

    handle() {
        this.addCode();
        this.addResource();
        this.addEquipementDetail();
        this.editDetailQuantity();
        this.getDetails();
    }

    addCode() {
        ipcMain.handle('add-equipement-code', async (event, type) => {
            try {
                const created = await Resource.create({ code: type, type: 'E' });

                return { status: 'success', message: 'Code ajoute !', id: created.id };
            } catch (err) {
                return this.errorStatus(err);
            }
        });
    }

    addResource() {
        ipcMain.handle('add-equipement-resource', async (event, resource, parentId) => {
            try {
                const [instance, created] = await Resource.findOrCreate({ where: { id: parentId }, defaults: { ...resource } });

                if (created) return { status: 'success', message: 'Resource Equipement ajoute !', resource: instance.toJSON() };

                if (!instance) return { status: 'error', message: 'Erreur' };

                const newResource = await instance.createResource(resource);

                if (!newResource) return { status: 'error', message: 'Erreur' };

                return { status: 'success', message: 'Resource Equipement ajoute !', resource: newResource.toJSON() };
            } catch (err) {
                return this.errorStatus(err);
            }
        });
    }

    addEquipementDetail() {
        ipcMain.handle('add-equipement-detail', async (event, equipementId, resourceId) => {
            try {
                const instance = await EquipementDetail.create({ EquipementId: equipementId, ResourceId: resourceId });

                if (!instance) return { status: 'error', message: 'Erreur' };

                return { status: 'success', message: 'Detail ajoute !', detail: instance.toJSON() };
            } catch (err) {
                return this.errorStatus(err);
            }
        });
    }

    editDetailQuantity() {
        ipcMain.handle('edit-detail-quantity', async (event, id, quantity) => {
            try {
                const instance = await EquipementDetail.update({ unit_quantity: quantity }, { where: { id: id } });

                console.log('edit', instance);
                return { status: 'success', message: 'Quantite modifie !' };
            } catch (err) {
                return this.errorStatus(err);
            }
        });
    }

    getDetails() {
        ipcMain.handle('get-details', async (event, equipementId) => {
            try {
                const instances = await EquipementDetail.findAll({
                    where: { EquipementId: equipementId },
                    raw: true,
                    attributes: [
                        'id',
                        'unit_quantity',
                        'Resource.code',
                        'Resource.description',
                        'Resource.unit',
                        'Resource.unit_price',
                        'Resource.type',
                    ],
                    include: [{ model: Resource, attributes: [] }],
                });

                console.log('get all', JSON.parse(JSON.stringify(instances)));
                return JSON.parse(JSON.stringify(instances));
            } catch (err) {
                return this.errorStatus(err);
            }
        });
    }

    // edit() {
    //     ipcMain.handle('edit-equipement', async (event, typeId, field, value) => {
    //         try {
    //             console.log('EDITIING', typeId, field, value);
    //             const typeToEdit = await Equipement.findByPk(typeId);

    //             if (!typeToEdit) return { status: 'error', message: 'Erreur' };

    //             const saved = await typeToEdit.set(field, value).save();

    //             if (!saved) return { status: 'error', message: 'Erreur' };

    //             return { status: 'success', message: 'Type modifie !' };
    //         } catch (err) {
    //             return this.errorStatus(err);
    //         }
    //     });
    // }

    errorStatus(err) {
        console.log(err);
        if (err.stack.includes('SequelizeUniqueConstraintError')) return { status: 'error', message: 'La resource existe deja' };
        return { status: 'error', message: 'Erreur' };
    }
}

module.exports = EquipementService;
