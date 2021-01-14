const { ipcMain } = require('electron');
const { Op } = require('sequelize');
const Bordereau = require('../../store/models/bordereau/bordereau');
class BordereauService {
    constructor() {}

    handle() {
        this.getAll();
        this.add();
        this.edit();
        this.delete();
    }

    getAll() {
        ipcMain.handle('get-all-bordereau', async () => {
            try {
                const bordereaux = await Bordereau.findAll();

                let hmap = {};

                bordereaux.forEach((bord) => {
                    hmap[bord.id] = bord.toJSON();

                    if (!bord.unit) hmap[bord.id].children = [];
                });
                let result = [];

                bordereaux.forEach((bord) => {
                    if (bord.BordereauId) {
                        hmap[bord.BordereauId].children.push(hmap[bord.id]);
                    } else {
                        result.push(hmap[bord.id]);
                    }
                });

                return JSON.parse(JSON.stringify(result));
            } catch (err) {
                return this.errorStatus(err);
            }
        });
    }

    edit() {
        ipcMain.handle('edit-bordereau', async (event, bordId, field, value) => {
            try {
                console.log('EDITIING BORD', bordId, field, value);
                const bordToEdit = await Bordereau.findByPk(bordId);

                if (!bordToEdit) return { status: 'error', message: 'Erreur' };

                const saved = await bordToEdit.set(field, value).save();

                if (!saved) return { status: 'error', message: 'Erreur' };

                return { status: 'success', message: 'Bordereau modifie !' };
            } catch (err) {
                return this.errorStatus(err);
            }
        });
    }

    add() {
        ipcMain.handle('add-bordereau', async (event, numero, description, parent) => {
            try {
                const created = await Bordereau.create({ numero, description, BordereauId: parent });

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

                return { status: 'success', message: 'Bordereau supprime !' };
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
