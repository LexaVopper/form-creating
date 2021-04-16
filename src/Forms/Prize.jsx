import React, { useState } from 'react';

import Characteristic from './Characteristic';
import cn from 'classnames';

function Prize({ watch, prizeRemove, index, item, control, register, errors }) {
  const watchImagePrize = watch(`prize[${index}].image`);

  const [edit, setEditBlock] = useState('');

  return (
    <div className='modul-prize prize' key={item.id}>
      <div className={cn('prize__photo  photo', { prize_photo: watchImagePrize?.length === 1 })}>
        <div className='photo__input'>
          {watchImagePrize?.length === 1 && (
            <img alt='' src={URL.createObjectURL(watchImagePrize[0])} />
          )}
          <label className='photo__label'>
            <i className='fas fa-camera'></i>

            <input
              {...register(`prize[${index}].image`, {
                required: <i className='fas fa-exclamation-triangle'></i>,
              })}
              type='file'
            />
          </label>
        </div>
        <p className='error'>{errors?.photo?.message}</p>
      </div>

      <div className='prize__content'>
        <div className='prize__title'>
          <input
            {...register(`prize[${index}].name`, {
              required: <i className='fas fa-exclamation-triangle'></i>,
            })}
            placeholder='название'
          />
          <p className='error'>{errors?.prize?.[index]?.name?.message}</p>
          <input
            {...register(`prize[${index}].price`, {
              required: <i className='fas fa-exclamation-triangle'></i>,
            })}
            placeholder='цена'
          />
          <p className='error'>{errors?.prize?.[index]?.price?.message}</p>
        </div>

        <Characteristic nestIndex={index} {...{ control, register, errors }} />
      </div>
      <button onClick={() => setEditBlock('edit')} className='prize__edit' type='button'>
        Ред
      </button>
      {index === 0 ? (
        ''
      ) : (
        <span className='prize__delete' onClick={() => prizeRemove(index)}>
          X
        </span>
      )}

      <div className={cn('prize__lock', { edit: edit === 'edit' })}></div>
    </div>
  );
}

export default Prize;
