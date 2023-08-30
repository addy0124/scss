import React, { useMemo, useState } from 'react';
import { useForm, useFieldArray, Control, FieldValues } from 'react-hook-form';

type DataType = {
  
    username: string;
    password: string;
    address: string;
    tel: string;
  
};

const PartTwo = () => {
  const [copyIndex, setCopyIndex] = useState<number | undefined>();
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
  } = useForm<{ fields: DataType[] }>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fields',
  });


  const handleCopyField = (index: number) => {
    const copiedField = { ...fields[index] };
    const updatedFields = watch(`fields`);
    updatedFields.splice(index+1, 0, copiedField);
    console.log("updatedFields : ", updatedFields);
    //append(copiedField);
    //console.log(copiedField);
    const username = watch(`fields.${index}.username`);
    const password = watch(`fields.${index}.password`);
    const address = watch(`fields.${index}.address`);
    const tel = watch(`fields.${index}.tel`);
    //console.log(copypw);
    append({"username": username, "password":password, "address": address, "tel":tel});
    setValue('fields', updatedFields);
  };

  console.log("fields : ", watch(`fields`))

  const handleRemoveField = (index: number) => {
    remove(index);
  };

  const onSubmit = (data: { fields: DataType[] }) => {
    console.log(data);
  };

  const fieldcss = useMemo(()=>{
    return
    <>
    <button></button>
    </>


  },[fields])

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
              username: '',
              password: '',
              address: '',
              tel: '',
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

export default PartTwo;





