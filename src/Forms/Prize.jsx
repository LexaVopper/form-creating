import React, { useState } from 'react';

import Characteristic from './Characteristic';
import cn from 'classnames';

function Prize({ watch, prizeRemove, index, item, control, register, errors }) {
  const watchImagePrize = watch(`prize[${index}].image`);

  const [edit, setEditBlock] = useState('');
  let toggle = edit;

  const toggleEdit = (str) => {
    if (str !== '') {
      setEditBlock('');
    } else {
      setEditBlock('edit');
    }
  };

  return (
    <div className='modul-prize prize' key={item.id}>
      <div className={cn('prize__content', { read: edit === '' })}>
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
          <p className='error'>{errors?.prize?.[index]?.image?.message}</p>
        </div>

        <div className='prize__title '>
          <div className='prize__title-name'>
            <input
              {...register(`prize[${index}].name`, {
                required: <i className='fas fa-exclamation-triangle'></i>,
              })}
              placeholder='название'
            />
            <p className='error'>{errors?.prize?.[index]?.name?.message}</p>
          </div>
          <div className='prize__title-price'>
            <input
              {...register(`prize[${index}].price`, {
                required: true,

                pattern: { value: /^\d+$/, message: 'Укажите цену цифрами' },
              })}
              placeholder='цена'
            />
            {errors?.prize?.[index]?.price && errors?.prize?.[index]?.price?.type === 'required' && (
              <p className='error'>
                <i className='fas fa-exclamation-triangle '></i>
              </p>
            )}
          </div>
        </div>
        <p className='error'>{errors?.prize?.[index]?.price?.message}</p>

        <Characteristic nestIndex={index} {...{ control, register, errors }} />
      </div>
      <button onClick={() => toggleEdit(toggle)} className='prize__edit' type='button'>
        {edit === '' ? 'Редактировать' : 'Сохранить'}
      </button>
      {index === 0 ? (
        ''
      ) : (
        <span className='prize__delete' onClick={() => prizeRemove(index)}>
          <i className='fas fa-minus-circle'></i>
        </span>
      )}

      <div className={cn('prize__lock', { edit: edit === 'edit' })}></div>
    </div>
  );
}

export default Prize;
