import React from 'react';
import { observer } from 'mobx-react';

// styles
const $input = 'input-reset form-control';
const $label = '.text-dark';
const $small = 'text-danger';

export default observer(({ field, type = 'text', placeholder = null }) => (
  <div className="measure">
    <label htmlFor={field.id} className={$label}>
      {field.label}
    </label>
    <input {...field.bind({ type, placeholder })} className={$input} />
    <small className={$small}>
      {field.error}
    </small>
  </div>
));
