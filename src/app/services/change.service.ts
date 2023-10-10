import { Injectable } from '@angular/core';
import { IChange } from '../models/ichange.interface';

@Injectable({
  providedIn: 'root'
})
export class ChangeService {

  constructor() { }

  newChange(_id:any, _status:any, _date:Date,_recipientiId:any,_text:string):IChange
  {
    return {
      id:_id,
      status:_status,
      date:_date,
      recipientId:_recipientiId,
      text:_text
    }
  }

  newFromAPIObject(apiObject:any):IChange|undefined
  {
    let change :IChange | undefined = undefined;
    if (apiObject.entry.length > 0 && apiObject.entry[0].changes.length > 0 &&
      apiObject.entry[0].changes[0].value &&
      apiObject.entry[0].changes[0].value.statuses &&
      apiObject.entry[0].changes[0].value.statuses.length > 0) {

        let text = '';
        if(apiObject.entry[0].changes[0].value.statuses[0].errors &&
          apiObject.entry[0].changes[0].value.statuses[0].errors.length > 0)
          {
            text = apiObject.entry[0].changes[0].value.statuses[0].errors[0].title;
          }

        change = this.newChange(apiObject.entry[0].changes[0].value.statuses[0].id,
          apiObject.entry[0].changes[0].value.statuses[0].status,
          new Date((+apiObject.entry[0].changes[0].value.statuses[0].timestamp) * 100),
          apiObject.entry[0].changes[0].value.statuses[0].recipient_id, text);
    }

    return change;
  }
}
