import { NgModule } from '@angular/core';
import { ProjectOutline, TeamOutline, UnorderedListOutline, TableOutline, DeleteTwoTone } from '@ant-design/icons-angular/icons';
import { NzIconModule, NZ_ICONS } from 'ng-zorro-antd/icon';

const icons = [ProjectOutline, TeamOutline, UnorderedListOutline, TableOutline, DeleteTwoTone];

@NgModule({
    imports: [NzIconModule],
    exports: [NzIconModule],
    providers: [{ provide: NZ_ICONS, useValue: icons }],
})
export class IconsProviderModule {}
