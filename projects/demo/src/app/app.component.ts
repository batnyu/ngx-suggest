import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

interface Tag {
  id: number;
  name: string;
  description: string;
  parent: string | null;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tags: Tag[] = [
    {
      id: 1,
      name: 'env',
      description: 'filtrer par environnement',
      parent: null
    },
    {
      id: 2,
      name: 'module',
      description: 'filtrer par module',
      parent: null
    },
    {
      id: 3,
      name: 'BP',
      description: null,
      parent: 'env'
    },
    {
      id: 4,
      name: 'LPR',
      description: null,
      parent: 'env'
    },
    {
      id: 5,
      name: 'GDR',
      description: null,
      parent: 'module'
    },
    {
      id: 6,
      name: 'TNG',
      description: null,
      parent: 'module'
    },
    {
      id: 7,
      name: 'EYF',
      description: null,
      parent: 'module'
    }
  ];

  control = new FormControl();
  filteredTags: Observable<Tag[]>;

  constructor() {
    this.groupByParent();
  }

  ngOnInit() {
    this.filteredTags = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): Tag[] {
    const [type, tag] = this.getMode(value);

    if (tag !== undefined) {
      return this.tags.filter(
        t => t.parent === type && this.includesName(t, tag)
      );
    }

    return this.tags.filter(t => !t.parent && this.includesName(t, type));
  }

  includesName(tag: Tag, value) {
    return tag.name.toLowerCase().includes(value.toLowerCase());
  }

  getMode(value) {
    const wordsArray: string[] = value.split(' ');
    const lastWord = wordsArray[wordsArray.length - 1];
    const res = lastWord.split(':');
    return res;
  }

  groupByParent() {
    const grouped = this.tags.reduce((acc, cur) => {
      if (!cur.parent) {
        acc[cur.name] = {
          description: cur.description,
          children: []
        };
      } else {
        acc[cur.parent] = {
          ...acc[cur.parent],
          children: [...acc[cur.parent].children, cur.name]
        };
      }
      return acc;
    }, {});

    console.log(grouped);
    return grouped;
  }

  getValue(tag) {
    return `${this.control.value || ''}${tag.name}${tag.parent ? ' ' : ':'}`;
  }
}
