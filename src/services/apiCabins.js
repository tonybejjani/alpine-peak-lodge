/** @format */

import supabase, { supabaseUrl } from './supabase';

export async function createEditCabin(newCabin, id) {
  //if there is an uploaded new image then create an Image Path.

  console.log(newCabin, id);
  const hasNewImage = newCabin.image.name ? true : false;

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  );
  const imagePath = hasNewImage
    ? `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
    : newCabin.image;

  console.log(imagePath);
  //1. Create/edit cabin
  let query = supabase.from('cabins');

  // A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created.');
  }

  //2. upload img
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  //3. delete cabin table row if there was an error uploading the corresponding image file
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.error(storageError);
    throw new Error(
      'Cabin Image could not be uploaded and the cabin was not created.'
    );
  }
  return data;
}

export async function getCabins() {
  let { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted.');
  }
}
