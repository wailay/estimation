const { ipcMain } = require('electron');
const Resource = require('../../store/models/resources/resource-model');
const { TeamResources } = require('../../store/models/team/team');
class TeamService {
    constructor() {}

    handle() {
        this.addTeamResource();
        this.editTeamQuantity();
        this.deleteTeamResource();
        this.getTeamResource();
        this.recomputeUnitPrice();
    }

    getTeamResource() {
        ipcMain.handle('get-team-resource', async (e, teamId) => {
            try {
                const team = await Resource.findOne({
                    where: { id: teamId },
                    include: 'Team',
                });

                let result = [];

                team.Team.forEach((t) => result.push(t.toJSON()));

                return result;
            } catch (err) {
                return this.errorStatus(err);
            }
        });
    }

    addTeamResource() {
        ipcMain.handle('add-team-resource', async (event, teamId, resourceId) => {
            try {
                // const instance = await TeamResources.create({ TeamId: teamId, TeamResourceId: resourceId });
                const team = await Resource.findOne({ where: { id: teamId } });
                const resource = await Resource.findOne({ where: { id: resourceId } });

                const created = await resource.addTeamResource(team, { through: { unit_quantity: 1 } });

                if (!created) return { status: 'error', message: 'Erreur', resource: created.toJSON() };

                return { status: 'success', message: '' };
            } catch (err) {
                return this.errorStatus(err);
            }
        });
    }

    editTeamQuantity() {
        ipcMain.handle('edit-team-quantity', async (event, teamId, resourceId, quantity) => {
            try {
                await TeamResources.update({ unit_quantity: quantity }, { where: { TeamId: teamId, TeamResourceId: resourceId } });

                return { status: 'success', message: 'Quantite modifie !' };
            } catch (err) {
                return this.errorStatus(err);
            }
        });
    }

    deleteTeamResource() {
        ipcMain.handle('delete-team-resource', async (event, teamId, resourceId) => {
            try {
                await TeamResources.destroy({ where: { TeamId: teamId, TeamResourceId: resourceId } });

                return { status: 'success', message: 'Ressource supprime !' };
            } catch (err) {
                return this.errorStatus(err);
            }
        });
    }

    recomputeUnitPrice() {
        ipcMain.handle('team-compute-unit-price', async (event, teamId) => {
            try {
                const team = await Resource.findOne({
                    where: { id: teamId },
                    include: 'Team',
                });

                let sum = 0;
                team.Team.forEach((res) => {
                    sum += res.unit_price * res.TeamResources.unit_quantity;
                });

                await team.set('unit_price', sum).save();

                return sum;
            } catch (err) {
                return this.errorStatus(err);
            }
        });
    }

    errorStatus(err) {
        console.log(err);
        if (err.stack.includes('SequelizeUniqueConstraintError')) return { status: 'error', message: "L'equipe existe deja" };
        return { status: 'error', message: 'Erreur' };
    }
}

module.exports = TeamService;
