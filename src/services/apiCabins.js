/** @format */

import supabase, { supabaseUrl } from './supabase';

export async function createEditCabin({ newCabin, id = null }) {
  const hasNewImage = newCabin.image.name ? true : false;

  console.log(hasNewImage);
  console.log(newCabin.image.length);
  //construct image path
  const imgName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '');
  const imgPath = hasNewImage
    ? `${supabaseUrl}/storage/v1/object/public/cabin-images/${imgName}`
    : newCabin.image;

  let query = supabase.from('cabins');

  //insert new cabin
  if (!id) {
    console.log('insert');
    query = query.insert([{ ...newCabin, image: imgPath }]);
  }

  if (id) {
    console.log('update');
    query = query.update({ ...newCabin, image: imgPath }).eq('id', id);
  }

  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created.');
  }

  if (!hasNewImage) return data;

  const { error: errorImage } = await supabase.storage
    .from('cabin-images')
    .upload(imgName, newCabin.image);

  //Image not uploaded: throw error and delete cabin created as well.
  if (errorImage) {
    console.error(errorImage);
    await supabase.from('cabins').delete().eq('id', data.id);
    throw new Error(
      'Cabin image could not be uploaded. Cabin could not be created.'
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
