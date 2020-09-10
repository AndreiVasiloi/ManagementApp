import firebase from "../config/firebase";

const db = firebase.firestore();

export function dataFromSnapshot(snapshot) {
  if (!snapshot.exists) return undefined;
  const data = snapshot.data();

  for (const prop in data) {
    if (data.hasOwnProperty(prop)) {
      if (data[prop] instanceof firebase.firestore.Timestamp) {
        data[prop] = data[prop].toDate();
      }
    }
  }
  return {
    ...data,
    id: snapshot.id,
  };
}

//items

export function orderItems(orderItem) {
  return db.collection("items").orderBy(orderItem);
}

export function listenToItemsFromFirestore(orderItem) {
    debugger
  return db.collection("items").orderBy(orderItem);
}

export function listenToItemFromFirestore(itemId) {
  return db.collection("items").doc(itemId);
}

export function addItemToFirestore(item) {
  return db.collection("items").add({
    ...item,
  });
}

export function updateItemInFirestore(item) {
  return db.collection("items").doc(item.id).update(item);
}

export function deleteItemInFirestore(itemId) {
  return db.collection("items").doc(itemId).delete();
}

// export function cancelItemToggle(item) {
//     return db.collection('events').doc(item.id).update({
//         isCancelled: !item.isCancelled
//     })
// }

//categories

export function listenToCategoriesFromFirestore() {
  return db.collection("categories").orderBy("text");
}

export function listenToCategoryFromFirestore(categoryId) {
  return db.collection("categories").doc(categoryId);
}

export function addCategoryToFirestore(category) {
  return db.collection("categories").add({
    ...category,
    value: { ...category }.text,
  });
}

export function updateCategoryInFirestore(category) {
  return db.collection("categories").doc(category.id).update(category);
}

export function deleteCategoryInFirestore(categoryId) {
  return db.collection("categories").doc(categoryId).delete();
}
