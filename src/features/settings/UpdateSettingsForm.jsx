/** @format */

import { useForm } from 'react-hook-form';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSettings } from './useSettings';
import Button from '../../ui/Button';
import { useUpdateSettings } from './useUpdateSettings';
import Spinner from '../../ui/Spinner';

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
    error,
  } = useSettings();

  const { register, handleSubmit, reset, getValues, formState } = useForm();

  const { errors } = formState;

  const { isUpdating, updateSettings } = useUpdateSettings();

  if (isLoading) return <Spinner />;

  function handleUpdate(e, field) {
    const { value } = e.target;
    if (!value) return;

    updateSettings({ [field]: value });
  }
  return (
    <Form>
      <FormRow
        label="Minimum nights/booking"
        error={errors?.minBookingLength?.message}
      >
        <Input
          type="number"
          id="minBookingLength"
          disabled={isUpdating}
          defaultValue={minBookingLength}
          // {...register('minBookingLength', {
          //   required: 'This field is required',
          //   min: { value: 1, message: 'Minimum Nights should be at least 1' },
          // })}
          onBlur={(e) => handleUpdate(e, 'minBookingLength')}
        />
      </FormRow>
      <FormRow
        label="Maximum nights/booking"
        error={errors?.maxBookingLength?.message}
      >
        <Input
          type="number"
          id="maxBookingLength"
          disabled={isUpdating}
          defaultValue={maxBookingLength}
          // {...register('maxBookingLength', {
          //   required: 'This field is required',
          //   min: { value: 1, message: 'Maximum nights should be at least 1' },
          //   validate: (value) =>
          //     +value >= +getValues().minBookingLength ||
          //     'Maximum booking length should be more than the minimum. ',
          // })}
          onBlur={(e) => handleUpdate(e, 'maxBookingLength')}
        />
      </FormRow>
      <FormRow
        label="Maximum guests/booking"
        error={errors?.maxGuestsPerBooking?.message}
      >
        <Input
          type="number"
          id="maxGuestsPerBooking"
          disabled={isUpdating}
          defaultValue={maxGuestsPerBooking}
          // {...register('maxGuestsPerBooking', {
          //   required: 'This field is required',
          //   min: { value: 1, message: 'Guests should be at least 1' },
          // })}
          onBlur={(e) => handleUpdate(e, 'maxGuestsPerBooking')}
        />
      </FormRow>
      <FormRow label="Breakfast price" error={errors?.breakfastPrice?.message}>
        <Input
          type="number"
          id="breakfastPrice"
          disabled={isUpdating}
          defaultValue={breakfastPrice}
          // {...register('breakfastPrice', {
          //   required: 'This field is required',
          //   min: { value: 1, message: 'Breakfast should be at least $1' },
          // })}
          onBlur={(e) => handleUpdate(e, 'breakfastPrice')}
        />
      </FormRow>
      {/* <FormRow>

        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>Save settings</Button>
      </FormRow>  */}
    </Form>
  );
}

export default UpdateSettingsForm;
