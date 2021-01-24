const { ipcMain } = require('electron');
const { Bordereau, BordereauResource } = require('../../store/models/bordereau/bordereau');
const Project = require('../../store/models/project/project-model');

class ProjectService {
    constructor() {}

    handle() {
        this.addProject();
        this.getProject();
        this.delete();
    }

    addProject() {
        ipcMain.handle('add-project', async (event, project) => {
            try {
                const created = await Project.create(project);
                if (!created) return { status: 'error', message: 'Erreur' };
                return { status: 'success', message: `Projet ${project.name} ajouté !` };
            } catch (err) {
                return this.errorStatus(err);
            }
        });
    }

    getProject() {
        ipcMain.handle('get-project', async (event) => {
            try {
                const projects = await Project.findAll();
                return { status: 'success', message: '', projects: JSON.parse(JSON.stringify(projects)) };
            } catch (err) {
                return this.errorStatus(err);
            }
        });
    }

    delete() {
        ipcMain.handle('delete-project', async (event, projectId) => {
            try {
                const bords = await Bordereau.findAll({ where: { ProjectId: projectId } });

                bords.forEach(async (bord) => {
                    await BordereauResource.destroy({ where: { BordereauId: bord.id } });
                });

                await Bordereau.destroy({ where: { ProjectId: projectId } });
                await Project.destroy({ where: { id: projectId } });

                return { status: 'success', message: 'Projet supprimer !' };
            } catch (err) {
                return this.errorStatus(err);
            }
        });
    }

    errorStatus(err) {
        console.log(err);
        if (err.stack.startsWith('SequelizeUniqueConstraintError')) return { status: 'error', message: 'Le project existe deja' };

        return { status: 'error', message: 'Erreur' };
    }
}

module.exports = ProjectService;
