import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { ru } from 'date-fns/esm/locale';

function FirstForm() {
  const { register, control, handleSubmit } = useForm({});

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'contributions',
  });
  React.useEffect(() => {
    if (fields.length === 0) {
      append();
    }
  }, []);

  const onSubmit = (data) => {
    console.log(data);
  };
  const addContrib = () => {
    if (fields.length > 3) {
    } else {
      append();
    }
  };
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  ]);

  return (
    <div className='competition --first'>
      <div className='competition__buttons'>
        <button>Конкурс</button>
        <button>Призы</button>
        <button>Все</button>
      </div>

      <form className='forms' onSubmit={handleSubmit(onSubmit)}>
        <div className='form'>
          <div className='form__title'>
            <h1>Название:</h1>
            <input {...register('name')} defaultValue={'state.firstName'} />
          </div>

          <div className='form__photo'>
            <h1>Фото:</h1>
            <label className='form__photo__input'>
              <i className='material-icons'>attach_file</i>
              <span>Добавить Фото</span>
              <input {...register('photo')} type='file' />
            </label>
          </div>

          {fields.map((item, index) => {
            return (
              <div className='form__contrib' key={item.id}>
                <div className='form__contrib__title'>Условие {index + 1}</div>
                <div className='form__contrib__content'>
                  <div className='form__contrib__content__social'>
                    <p>Social: </p>
                    <select {...register(`contributions.${index}.social`)}>
                      <option value='Vk'>Vk</option>
                      <option value='Inst'>Instagram</option>
                    </select>
                  </div>

                  <div className='form__contrib__content__type'>
                    <p>Act: </p>
                    <select {...register(`contributions.${index}.type`)}>
                      <option value='Like'>Like</option>
                      <option value='Repost'>Repost</option>
                    </select>
                  </div>
                </div>

                <div className='form__contrib__link'>
                  <p> Ссылка: </p>
                  <input {...register(`contributions.${index}.link`)} />
                </div>

                {index === 0 ? (
                  ''
                ) : (
                  <span className='form__contrib__delete' onClick={() => remove(index)}>
                    X
                  </span>
                )}
              </div>
            );
          })}
          <button className='form__button' type='button' onClick={addContrib}>
            <p>Добавить</p>
          </button>

          <div className='form__quantity'>
            <p>Кол-во участников:</p>
            <input {...register(`quantity.${'0'}`)} defaultValue={0} placeholder='0' readOnly />
            <span>/</span>{' '}
            <input {...register(`quantity.${'1'}`)} placeholder='32' defaultValue={32} />
          </div>

          <DateRange
            editableDateInputs={true}
            onChange={(item) => setState([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={state}
            locale={ru}
          />
        </div>
        <div className='form-second'>
          <div className='form-second prize'>
            <div className='prize__photo'></div>
            <div className='prize__content'>
              <div className='prize__title'></div>
              <div className='prize-characteristic'>
                <div className='prize-characteristic__delete'>X</div>
                <div className='prize-characteristic__name'></div>
                <div className='prize-characteristic__type'></div>
              </div>
            </div>
          </div>
        </div>
        <input className='forms__next' type='submit' />
      </form>
    </div>
  );
}

export default FirstForm;
