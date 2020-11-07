import React from "react";
import { Segment, Header, Button } from "semantic-ui-react";
import { NavLink, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listenToItems } from "../inventoryItemsActions";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MySelectInput from "../../../app/common/form/MySelectInput";
import MyDateInput from "../../../app/common/form/MyDateInput";
import MyNumberInput from "../../../app/common/form/MyNumberInput";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import {
  listenToItemFromFirestore,
  updateItemInFirestore,
  addItemToFirestore,
  listenToCategoriesFromFirestore,
} from "../../../app/firestore/firestoreService";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { toast } from "react-toastify";
import classes from "../../../css/Form.module.css";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import { listenToCategories } from "../inventoryCategoriesActions";

export default function InventoryItemForm({ match, history }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const categories = useSelector((state) => state.category.categories);
  const selectedItem = useSelector((state) =>
    state.item.items.find((i) => i.id === match.params.id)
  );
  const { loading, error } = useSelector((state) => state.async);
  const initialValues = selectedItem ?? {
    category: "",
    name: "",
    expirationDate: "",
    amount: "",
  };

  const currentUserCategories = categories.filter(
    (category) => category?.userUid === currentUser?.uid
  );

  const newCategories = currentUserCategories.map((categories) => ({
    value: categories.value,
    text: categories.text,
    id: categories.id,
  }));


  const validationSchema = Yup.object({
    category: Yup.string().required("You must provide a category"),
    name: Yup.string().required("You must provide a name"),
    expirationDate: Yup.string().required(),
    amount: Yup.string().required(),
  });

  useFirestoreCollection({
    query: () => listenToCategoriesFromFirestore(),
    data: (categories) => dispatch(listenToCategories(categories)),
    deps: [dispatch],
  });

  useFirestoreDoc({
    shouldExecute: !!match.params.id,
    query: () => listenToItemFromFirestore(match.params.id),
    data: (item) => dispatch(listenToItems([item])),
    deps: [match.params.id, dispatch],
  });

  if (loading) return <LoadingComponent content='Loading event...' />;

  if (error) return <Redirect to='/error' />;

  return (
    <Segment clearing className={classes.formContainer}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            selectedItem
              ? await updateItemInFirestore(values)
              : await addItemToFirestore(values);
            history.push("/inventory");
          } catch (error) {
            toast.error(error.message);
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, dirty, isValid }) => (
          <Form className='ui form'>
            <Header
              sub
              color='teal'
              content={selectedItem ? "Edit item" : "Add item"}
            />
            <MySelectInput
              name='category'
              placeholder='Category'
              options={newCategories}
            />
            <MyTextInput name='name' placeholder='Name' />
            <MyDateInput
              name='expirationDate'
              placeholderText='Expiration Date'
              dateFormat='MMMM d, yyyy'
              autoComplete='off'
            />
            <MyNumberInput name='amount' placeholder='Amount' />
            <Button
              type='submit'
              floated='right'
              className={classes.formSubmitBtn}
              content='Submit'
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
            />
            <Button
              disabled={isSubmitting}
              type='submit'
              className={classes.formCancelBtn}
              floated='right'
              content='Cancel'
              as={NavLink}
              to='/inventory'
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
}
