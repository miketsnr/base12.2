import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

    testvar = '';
    form: FormGroup = this.fb.group({
      html: new FormControl('<div>test</div><ul><li>1</li><li class="ql-indent-1">1-1</li><li>2</li><ol><li>numbered</li><li class="ql-indent-1">numbered-1</li></ol></ul><div><br></div>'),
      json: new FormControl({ "ops": [ { "insert": "Hello " }, { "attributes": { "bold": true }, "insert": "World!" }, { "insert": "\n\n" },
        { "insert": { "image": "data:image/png;base64,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" } }, { "insert": "\n" } ] })
    })
  
    constructor(private sanitizer: DomSanitizer, private fb: FormBuilder) {}
    ngOnInit(): void {
    }
  
    savetext(){
      this.testvar = JSON.stringify(this.form.value.json.ops);
    }
  
  
  }
  