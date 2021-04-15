import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, useFieldArray } from 'react-hook-form';

import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { ru } from 'date-fns/esm/locale';
import { toggleForms } from './redux/actions';

import cn from 'classnames';
import Prize from './Prize';

function CreateCompetition() {
  const {
    register,
    control,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({});

  const togglePageVisible = useSelector((state) => state.toggleForms.toggleParams);
  const dispatch = useDispatch();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'contributions',
  });
  const watchImageCompet = watch('photo');

  const { fields: prizeFields, append: prizeAppend, remove: prizeRemove } = useFieldArray({
    control,
    name: 'prize',
  });

  React.useEffect(() => {
    if (fields.length === 0) {
      append();
    }
    if (prizeFields.length === 0) {
      prizeAppend();
    }
  }, []);

  const addContrib = () => {
    if (fields.length > 3) {
    } else {
      append();
    }
  };
  const addPrize = () => {
    if (prizeFields.length > 3) {
    } else {
      prizeAppend();
    }
  };

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const toggle = (param) => {
    switch (param) {
      case 'contributions':
        dispatch(toggleForms(param));
        break;
      case 'prize':
        dispatch(toggleForms(param));
        break;

      default:
        break;
    }
  };

  const onSubmit = (data) => {
    const lotery = {
      id: 1,
      name: data.name,
      image: data.photo,
      contributions: data.contributions,
      startDate: state[0].startDate,
      endDate: state[0].endDate,
      quantity: data.quantity[1],
      prize: data.prize,
    };
    console.log(lotery);
    console.log('data');
    console.log(data);
  };

  const toggleNames = ['contributions', 'prize'];

  return (
    <div className='competition'>
      <div className='competition__buttons'>
        <button className='button-mini' onClick={() => toggle(toggleNames[0])}>
          Конкурс
        </button>
        <button className='button-mini' onClick={() => toggle(toggleNames[1])}>
          Призы
        </button>
        <button className='button-mini'>Все</button>
      </div>

      <form className='moduls' onSubmit={handleSubmit(onSubmit)}>
        <div
          className={cn(
            'modul-competition',
            { active: togglePageVisible === 'contributions' },
            { hide: togglePageVisible !== 'contributions' },
          )}>
          <div className='modul-competition__title'>
            <h1>Название:</h1>
            <input
              {...register('name', {
                required: <i className='fas fa-exclamation-triangle'></i>,
                maxLength: 30,
              })}
            />
            <p className='error'>{errors?.name?.message}</p>
          </div>

          <div
            className={cn('modul-competition photo', {
              set_photo: watchImageCompet?.length === 1,
            })}>
            <h1>Фото:</h1>

            {watchImageCompet?.length === 1 && (
              <img alt='' src={URL.createObjectURL(watchImageCompet[0])} />
            )}

            <div className='photo__input'>
              <label>
                <i className='fas fa-camera'></i>

                <input
                  {...register('photo', {
                    required: <i className='fas fa-exclamation-triangle'></i>,
                  })}
                  type='file'
                  //onChange={(e) => setImage(URL.createObjectURL(e?.target?.files[0]))}
                />
              </label>
            </div>
            <p className='error'>{errors?.photo?.message}</p>
          </div>

          {fields.map((item, index) => {
            return (
              <div className='modul-competition contrib' key={item.id}>
                <div className='contrib__title'>Условие {index + 1}</div>
                <div className='contrib__content block'>
                  <div className='block__social'>
                    <p>Social: </p>
                    <select {...register(`contributions.${index}.social`)}>
                      <option value='Vk'>Vk</option>
                      <option value='Inst'>Instagram</option>
                    </select>
                  </div>

                  <div className='block__type'>
                    <p>Act: </p>
                    <select {...register(`contributions.${index}.type`)}>
                      <option value='Like'>Like</option>
                      <option value='Repost'>Repost</option>
                    </select>
                  </div>
                </div>

                <div className='contrib__link'>
                  <p> Ссылка: </p>
                  <input
                    {...register(`contributions.${index}.link`, {
                      required: 'Укажите ссылку',
                    })}
                  />
                </div>
                <p className='error link'>{errors?.contributions?.[index]?.link?.message}</p>

                {index === 0 ? (
                  ''
                ) : (
                  <span className='contrib__delete' onClick={() => remove(index)}>
                    X
                  </span>
                )}
              </div>
            );
          })}

          <button className='modul-competition button' type='button' onClick={addContrib}>
            <p>Добавить</p>
          </button>

          <div className='modul-competition__quantity'>
            <p>Кол-во участников:</p>
            <input {...register(`quantity.${'0'}`)} defaultValue={0} placeholder='0' readOnly />
            <span>/</span>{' '}
            <input {...register(`quantity.${'1'}`)} placeholder='32' defaultValue={32} />
          </div>
          <h1>Дата проведения</h1>
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setState([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={state}
            locale={ru}
          />
        </div>

        <div
          className={cn(
            'modul-prize',
            { active: togglePageVisible === 'prize' },
            { hide: togglePageVisible !== 'prize' },
          )}>
          {prizeFields.map((item, index) => (
            <Prize
              watch={watch}
              key={`${item.id}_${index}`}
              item={item}
              index={index}
              {...{ control, register, errors }}
              prizeRemove={prizeRemove}
            />
          ))}
          <button className='button' type='button' onClick={addPrize}>
            <p>Добавить приз</p>
          </button>
        </div>

        <input
          className={cn(
            'moduls__next',
            { active: togglePageVisible === 'prize' },
            { hide: togglePageVisible !== 'prize' },
          )}
          type='submit'
        />
      </form>
    </div>
  );
}

export default CreateCompetition;
