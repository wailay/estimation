const { ipcMain } = require('electron');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../../store/db');
const FraisGeneraux = require('../../store/models/frais-generaux/frais-generaux');
class FGService {
    constructor() {}

    handle() {
        this.getAll();
        this.delete();
        this.edit();
        this.add();
        this.getTotal();
    }

    getAll() {
        ipcMain.handle('get-all-fg', async (e, projId) => {
            try {
                const fgs = await sequelize.query(
                    `   SELECT F.id, F.total_price, F.quantity, R.code, R.description, R.unit, R.unit_price 
                        FROM FraisGeneraux AS F 
                        JOIN Resources AS R ON F.ResourceId = R.id 
                        JOIN Projects as P ON P.id = F.ProjectId 
                        WHERE P.id = ?`,
                    {
                        replacements: [projId],
                        type: QueryTypes.SELECT,
                    },
                );

                return fgs;
            } catch (err) {
                return this.errorStatus(err);
            }
        });
    }

    getTotal() {
        ipcMain.handle('get-total-fg', async () => {
            try {
                const totalPrice = await FraisGeneraux.sum('total_price');

                return totalPrice;
            } catch (err) {
                return this.errorStatus(err);
            }
        });
    }

    add() {
        ipcMain.handle('add-fg', async (e, fg) => {
            try {
                const created = await FraisGeneraux.create(fg);

                return { status: 'success', message: 'FG ajoute !', fg: created.toJSON() };
            } catch (err) {
                return this.errorStatus(err);
            }
        });
    }
    edit() {
        ipcMain.handle('edit-fg', async (event, id, field, value, projId) => {
            try {
                const fgEdit = await FraisGeneraux.findByPk(id);
                const resource = await sequelize.query(
                    `   SELECT F.id, R.code, R.unit_price 
                        FROM FraisGeneraux AS F 
                        JOIN Resources AS R ON F.ResourceId = R.id 
                        JOIN Projects as P ON P.id = F.ProjectId 
                        WHERE P.id = ? AND F.id = ?`,
                    {
                        replacements: [projId, id],
                        type: QueryTypes.SELECT,
                    },
                );

                if (!fgEdit) return { status: 'error', message: 'Erreur' };

                let saved = await fgEdit.set(field, value).save();

                const newTotal = fgEdit.quantity * resource[0].unit_price;
                saved = await fgEdit.set('total_price', newTotal).save();

                if (!saved) return { status: 'error', message: 'Erreur' };

                return { status: 'success', message: 'FG modifie !', fg: saved.toJSON() };
            } catch (err) {
                return this.errorStatus(err);
            }
        });
    }

    delete() {
        ipcMain.handle('delete-fg', async (event, id) => {
            try {
                await FraisGeneraux.destroy({ where: { id: id } });

                return { status: 'success', message: 'FG supprime !' };
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

module.exports = FGService;
