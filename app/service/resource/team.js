const { ipcMain } = require('electron');
const { textSpanIsEmpty } = require('typescript');
const Resource = require('../../store/models/resources/resource-model');
const { TeamResources, Team } = require('../../store/models/team/team');
class TeamService {
    constructor() {}

    handle() {
        this.addTeam();
        this.addTeamResource();
        this.editTeam();
        this.editTeamQuantity();
        this.deleteTeam();
        this.deleteTeamResource();
        this.getAll();
        this.getTeamResource();
        this.recomputeUnitPrice();
    }

    getAll() {
        ipcMain.handle('get-all-teams', async () => {
            try {
                const teams = await Team.findAll({});

                return JSON.parse(JSON.stringify(teams));
            } catch (err) {
                return this.errorStatus(err);
            }
        });
    }

    getTeamResource() {
        ipcMain.handle('get-team-resource', async (e, teamId) => {
            try {
                const teams = await Team.findOne({
                    where: { id: teamId },
                    include: [{ model: Resource }],
                });

                if (!teams || teams.Resources.length === 0) return [];

                return JSON.parse(JSON.stringify(teams.Resources));
            } catch (err) {
                return this.errorStatus(err);
            }
        });
    }

    addTeam() {
        ipcMain.handle('add-team', async (event, team, total) => {
            try {
                const instance = await Team.create({ ...team, unit_price: total });

                if (!instance) return { status: 'error', message: 'Erreur' };

                return { status: 'success', message: 'Equipe ajoute !', id: instance.id };
            } catch (err) {
                return this.errorStatus(err);
            }
        });
    }

    addTeamResource() {
        ipcMain.handle('add-team-resource', async (event, teamId, resourceId) => {
            try {
                const instance = await TeamResources.create({ TeamId: teamId, ResourceId: resourceId });

                if (!instance) return { status: 'error', message: 'Erreur' };

                return { status: 'success', message: '' };
            } catch (err) {
                return this.errorStatus(err);
            }
        });
    }

    editTeam() {
        ipcMain.handle('edit-team', async (event, id, field, value) => {
            try {
                console.log('EDITIING', id, field, value);
                const teamToEdit = await Team.findByPk(typeId);

                if (!teamToEdit) return { status: 'error', message: 'Erreur' };

                const saved = await teamToEdit.set(field, value).save();

                if (!saved) return { status: 'error', message: 'Erreur' };

                return { status: 'success', message: 'Equipe modifie !' };
            } catch (err) {
                return this.errorStatus(err);
            }
        });
    }

    editTeamQuantity() {
        ipcMain.handle('edit-team-quantity', async (event, teamId, resourceId, quantity) => {
            try {
                const instance = await TeamResources.update({ unit_quantity: quantity }, { where: { TeamId: teamId, ResourceId: resourceId } });

                console.log('edit', instance);
                return { status: 'success', message: 'Quantite modifie !' };
            } catch (err) {
                return this.errorStatus(err);
            }
        });
    }

    deleteTeam() {
        ipcMain.handle('delete-team', async (event, teamId) => {
            try {
                await Team.destroy({ where: { id: teamId } });
                await TeamResources.destroy({ where: { TeamId: teamId } });

                return { status: 'success', message: 'Equipe supprime !' };
            } catch (err) {
                return this.errorStatus(err);
            }
        });
    }

    deleteTeamResource() {
        ipcMain.handle('delete-team-resource', async (event, teamId, resourceId) => {
            try {
                await Team.destroy({ where: { id: teamId } });
                await TeamResources.destroy({ where: { TeamId: teamId, ResourceId: resourceId } });

                return { status: 'success', message: 'Ressource supprime !' };
            } catch (err) {
                return this.errorStatus(err);
            }
        });
    }

    recomputeUnitPrice() {
        ipcMain.handle('team-compute-unit-price', async (event, teamId) => {
            try {
                const team = await Team.findOne({
                    where: { id: teamId },
                    include: [{ model: Resource }],
                });

                if (team.Resources.length === 0) return 0;

                let sum = 0;
                team.Resources.forEach((res) => {
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
