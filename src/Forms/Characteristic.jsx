import React from 'react';
import { useFieldArray } from 'react-hook-form';

function Characteristic({ nestIndex, control, register, errors }) {
  const { fields: charFields, append: charkAppend, remove: charRemove } = useFieldArray({
    control,
    name: `prize[${nestIndex}].params`,
  });

  const addCharac = () => {
    charkAppend();
  };

  return (
    <div className='prize__content characteristic-module'>
      {charFields.map((item, ind) => {
        return (
          <div className='prize__content characteristic' key={item.id}>
            <div className='characteristic__name'>
              <input
                {...register(`prize.${nestIndex}.params[${ind}].price`, {
                  required: 'Нужно заполнить поле',
                })}
                placeholder='Характеристика'
              />
              <p className='error'>{errors?.prize?.[nestIndex]?.params?.[ind]?.price?.message}</p>
            </div>
            <div className='characteristic__type'>
              <input
                {...register(`prize.${nestIndex}.params[${ind}].value`, {
                  required: 'Нужно заполнить поле',
                })}
                placeholder='Тип'
              />
              <p className='error'>{errors?.prize?.[nestIndex]?.params?.[ind]?.value?.message}</p>
            </div>
            <span className='characteristic__delete' onClick={() => charRemove(ind)}>
              <i className='fas fa-trash'></i>
            </span>
          </div>
        );
      })}
      <button className='button-mini' type='button' onClick={addCharac}>
        <p>+ Характеристика</p>
      </button>
    </div>
  );
}

export default Characteristic;
