import React, { useMemo, useState } from 'react';
import { useForm, useFieldArray, Control, FieldValues } from 'react-hook-form';

type DataType = {
  fields: {
    username: string;
    password: string;
    address: string;
    tel: string;
  }[];
};

const Part_three = () => {
  const [copyIndex, setCopyIndex] = useState<number | undefined>();
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
  } = useForm<DataType>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fields',
  });

  const handleCopyField = (index: number) => {
    const copiedField = { ...fields[index] };
    append(copiedField);
  };

  const handleRemoveField = (index: number) => {
    remove(index);
  };

  const onSubmit = (data: DataType) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div key={field.id}>
            <input
              {...register(`fields.${index}.username` as const)}
              defaultValue={field.username}
            />
            <input
              {...register(`fields.${index}.password` as const)}
              defaultValue={field.password}
            />
            <input
              {...register(`fields.${index}.address` as const)}
              defaultValue={field.address}
            />
            <input
              {...register(`fields.${index}.tel` as const)}
              defaultValue={field.tel}
            />
            <button type="button" onClick={() => handleRemoveField(index)}>
              Remove
            </button>
            <button type="button" onClick={() => handleCopyField(index)}>
              Copy
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            append({
              ...fields[0], // Copy values from the first field
            })
          }
        >
          Add
        </button>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Part_three;