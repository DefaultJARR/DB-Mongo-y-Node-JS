import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {
  public projects: Project[];
  public url: string;

  constructor(
    private _projectService: ProjectService
  ) {
    this.url = _projectService.url;
  }

  ngOnInit() {
    this.getListProjects();
  }

  getListProjects() {
    this._projectService.listProjects().subscribe(
      res => {
        console.log(res);
        if (res.projects) {
          this.projects = res.projects;
        }
      },
      err => {
        console.log(<any>err);
      }
    );
  }

}
