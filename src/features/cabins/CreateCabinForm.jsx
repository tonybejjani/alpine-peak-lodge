/** @format */
import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';
import { useCreateCabin } from './useCreateCabin';
import { useUpdateCabin } from './useUpdateCabin';

function CreateCabinForm({ cabin = {}, onCloseModal }) {
  const { id: updateCabinId, ...cabinUpdateValues } = cabin;

  console.log(cabin);
  const isUpdateSession = Boolean(updateCabinId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: { ...cabinUpdateValues },
  });

  const { errors } = formState;

  const { isCreating, createCabin } = useCreateCabin();

  const { isUpdating, updateCabin } = useUpdateCabin();

  const isWorking = isCreating || isUpdating;

  function onSubmit(data) {
    const image = data?.image[0]?.name
      ? data.image[0]
      : cabinUpdateValues.image;

    if (isUpdateSession) {
      updateCabin(
        {
          newCabin: {
            ...data,
            image,
          },
          id: updateCabinId,
        },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createCabin(
        {
          newCabin: { ...data, image },
        },
        {
          // data: returned data by the createEditAsync function

          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  return (
    //here mutate is passed data as an argument. mutate(data) by handleSubmit
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register('name', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register('maxCapacity', {
            required: 'This field is required',
            min: { value: 1, message: 'Capacity should be at least 1' },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register('regularPrice', {
            required: 'This field is required',
            min: { value: 1, message: 'Capacity should be at least 1' },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              +value <= +getValues().regularPrice ||
              'Discount should be less than regular price',
          })}
        />
      </FormRow>

      <FormRow label="Description for Website">
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register('description', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label="Cabin Photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register('image', {
            required: isUpdateSession ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isUpdateSession ? 'Update cabin' : 'Add cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
