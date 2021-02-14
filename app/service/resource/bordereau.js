const { ipcMain } = require('electron');
const { Op } = require('sequelize');
const { Bordereau, BordereauResource } = require('../../store/models/bordereau/bordereau');
const Resource = require('../../store/models/resources/resource-model');
class BordereauService {
    constructor() {}

    handle() {
        this.getAll();
        this.add();
        this.edit();
        this.editBR();
        this.delete();
        this.affect();
        this.deleteResource();
        this.recompute();
        this.getAllWithoutRes();
        this.getTotalPrice();
    }

    getAllWithoutRes() {
        ipcMain.handle('get-all-b-without-res', async (e, projectId) => {
            try {
                const bordereaux = await Bordereau.findAll({ where: { ProjectId: projectId } });

                let hmap = {};

                bordereaux.forEach((bord) => {
                    hmap[bord.id] = bord.toJSON();
                    hmap[bord.id].children = [];
                });

                let result = [];

                bordereaux.forEach((bord) => {
                    if (bord.BordereauId) {
                        hmap[bord.BordereauId].children.push(hmap[bord.id]);
                    } else {
                        result.push(hmap[bord.id]);
                    }
                });

                return result;
            } catch (err) {
                return this.errorStatus(err);
            }
        });
    }

    getAll() {
        ipcMain.handle('get-all-bordereau', async (e, projectId) => {
            try {
                const bordereaux = await Bordereau.findAll({ include: Resource, where: { ProjectId: projectId } });

                let hmap = {};

                bordereaux.forEach((bord) => {
                    hmap[bord.id] = bord.toJSON();
                    const res = bord.Resources.map((r) => r.toJSON());
                    if (!bord.type || res.length > 0) hmap[bord.id].children = res;
                });

                let result = [];

                bordereaux.forEach((bord) => {
                    if (bord.BordereauId) {
                        hmap[bord.BordereauId].children.push(hmap[bord.id]);
                    } else {
                        result.push(hmap[bord.id]);
                    }
                });

                return result;
            } catch (err) {
                return this.errorStatus(err);
            }
        });
    }

    edit() {
        ipcMain.handle('edit-bordereau', async (event, bordId, field, value) => {
            try {
                const bordToEdit = await Bordereau.findByPk(bordId, { include: Resource });

                if (!bordToEdit) return { status: 'error', message: 'Erreur' };
                const saved = await bordToEdit.set(field, value).save();
                if (!saved) return { status: 'error', message: 'Erreur' };

                let montant_final = 0;
                if (field === 'quantity') {
                    for (const resource of bordToEdit.Resources) {
                        let duration = '';
                        if (resource.type === 'T') {
                            await resource.BordereauResource.set('quantity', value).save();
                        } else {
                            await resource.BordereauResource.set('quantity', Math.round(value / 8.5)).save();
                        }

                        let total_price = 0;

                        if (typeof resource.BordereauResource.production === 'number') {
                            duration = parseFloat((resource.BordereauResource.quantity / resource.BordereauResource.production).toFixed(2));
                            await resource.BordereauResource.set('duration', duration).save();
                            total_price = duration * resource.unit_price;
                        } else {
                            total_price = resource.BordereauResource.quantity * resource.unit_price;
                        }

                        await resource.BordereauResource.set('total_price', total_price).save();
                        montant_final += total_price;
                    }
                    await bordToEdit.set('total_price', montant_final).save();
                    await bordToEdit.set('b_unit_price', parseFloat((montant_final / value).toFixed(2))).save();
                }

                return { status: 'success', message: 'Bordereau modifie !', bordereau: bordToEdit.toJSON() };
            } catch (err) {
                return this.errorStatus(err);
            }
        });
    }

    async _editBR(bordId, resId, field, value) {
        try {
            const bordToEdit = await BordereauResource.findOne({ where: { BordereauId: bordId, ResourceId: resId } });
            const resource = await Resource.findOne({ where: { id: resId } });

            if (!bordToEdit) return { status: 'error', message: 'Erreur' };

            const saved = await bordToEdit.set(field, value).save();
            console.log(field, value);
            let newTotal = 0;
            console.log(field);

            if (field !== 'unit_production') {
                if (typeof value === 'number' && typeof bordToEdit.production === 'number') {
                    const newDuration = Math.round(bordToEdit.quantity / bordToEdit.production);
                    await bordToEdit.set('duration', newDuration).save();
                    newTotal = newDuration * resource.unit_price;
                } else {
                    newTotal = resource.unit_price * bordToEdit.quantity;
                    await bordToEdit.set('duration', '').save();
                }
                await bordToEdit.set('total_price', newTotal).save();
            }

            if (!saved) return { status: 'error', message: 'Erreur' };

            return { status: 'success', message: 'Bordereau Resource modifie !', bordereau: bordToEdit.toJSON() };
        } catch (err) {
            return this.errorStatus(err);
        }
    }

    editBR() {
        ipcMain.handle('edit-bordereau-resource', async (event, bordId, resId, field, value) => {
            try {
                return this._editBR(bordId, resId, field, value);
            } catch (err) {
                return this.errorStatus(err);
            }
        });
    }

    add() {
        ipcMain.handle('add-bordereau', async (event, bord, parent, projectId) => {
            try {
                const created = await Bordereau.create({ ...bord, BordereauId: parent, ProjectId: projectId });

                return { status: 'success', message: 'Bordereau ajoute !', id: created.id };
            } catch (err) {
                return this.errorStatus(err);
            }
        });
    }

    delete() {
        ipcMain.handle('delete-bordereau', async (event, id) => {
            try {
                await Bordereau.destroy({ where: { [Op.or]: [{ id: id }, { BordereauId: id }] } });
                await BordereauResource.destroy({ where: { BordereauId: id } });

                return { status: 'success', message: 'Bordereau supprime !' };
            } catch (err) {
                return this.errorStatus(err);
            }
        });
    }

    deleteResource() {
        ipcMain.handle('delete-bordereau-resource', async (event, id, resourceId) => {
            try {
                await BordereauResource.destroy({ where: { BordereauId: id, ResourceId: resourceId } });

                return { status: 'success', message: 'Bordereau ressource supprime !' };
            } catch (err) {
                return this.errorStatus(err);
            }
        });
    }

    affect() {
        ipcMain.handle('affect-bordereau', async (e, resources, parent) => {
            try {
                const bord = await Bordereau.findByPk(parent);

                let montant_final = 0;
                if (typeof bord.total_price === 'number') montant_final = bord.total_price;

                let addedRes = [];
                for (const res of resources) {
                    const resource = await Resource.findOne({ where: { id: res.id } });
                    let quantity = Math.round(bord.quantity / 8.5);
                    let duration = '';

                    if (resource.type === 'T') {
                        quantity = bord.quantity;
                    }
                    let total_price = null;

                    if (typeof resource.production === 'number') {
                        duration = parseFloat((quantity / resource.production).toFixed(2));
                        total_price = duration * resource.unit_price;
                    } else {
                        total_price = quantity * resource.unit_price;
                    }

                    montant_final += total_price;

                    const newRes = await bord.addResource(resource, {
                        through: { quantity: quantity, duration: duration, total_price: total_price, production: resource.production },
                    });
                    addedRes.push({ ...resource.toJSON(), BordereauResource: newRes[0].toJSON() });
                }

                let b_unit_price = montant_final / bord.quantity;

                await bord.set('total_price', montant_final).save();
                await bord.set('b_unit_price', b_unit_price).save();

                return { status: 'sucess', message: 'Affectation reussi !', resources: addedRes, bordereau: bord.toJSON() };
            } catch (err) {
                return this.errorStatus(err);
            }
        });
    }

    recompute() {
        ipcMain.handle('bordereau-recompute', async (e, bordId) => {
            try {
                console.log('recomputing');
                const bord = await Bordereau.findByPk(bordId, { include: Resource });

                const resources = bord.Resources;
                let total_price = 0;

                for (const res of resources) {
                    total_price += res.BordereauResource.total_price;
                }

                await bord.set('total_price', total_price).save();
                const b_unit_price = Math.round(total_price / bord.quantity);
                await bord.set('b_unit_price', b_unit_price).save();

                return { status: 'sucess', message: 'Recompute reussi !', bordereau: bord.toJSON() };
            } catch (err) {
                return this.errorStatus(err);
            }
        });
    }

    getTotalPrice() {
        ipcMain.handle('bordereau-total-price', async () => {
            try {
                const totalPrice = await Bordereau.sum('total_price');

                return totalPrice;
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

module.exports = BordereauService;
