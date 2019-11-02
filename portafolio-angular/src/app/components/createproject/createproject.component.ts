import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-createproject',
  templateUrl: './createproject.component.html',
  styleUrls: ['./createproject.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateprojectComponent implements OnInit {
  public title: string;
  public project: Project;
  public status: string;
  public filesToUpload: Array<File>;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService
  ) {
    this.title = 'Crear Proyecto';
    this.project = new Project('', '', '', '', 2019, '', '');
  }

  ngOnInit() {
  }

  onSubmit(form) {
    console.log("Proyecto Enviado: ", this.project);

    // Creación del Proyecto
    this._projectService.saveProject(this.project).subscribe(
      res => {
        console.log("Proyecto Creado: ", res);
        if (res.project) {
          this.status = "success";

          // Subida de la imagen
          this._uploadService.makeFileRequest(this._uploadService.url + '/upload-project-image/' + res.project._id, [], this.filesToUpload, 'image')
            .then((result: any) => {
              console.log(result);
              form.reset();
            });
        }
        else {
          this.status = "failed";
        }
      },
      err => {
        console.log(<any>err);
      }
    );
  }

  fileChangeEvent(fileInput: any) {
    console.log(fileInput);
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
