/** @format */

import supabase, { supabaseUrl } from './supabase';

export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name.replaceAll(
    '/',
    ''
  )}`;

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  //https://jroqiytbtljjznebyltj.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg?t=2024-05-26T19%3A15%3A03.293Z
  //1. Create cabin
  let { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imagePath }])
    .select();

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
