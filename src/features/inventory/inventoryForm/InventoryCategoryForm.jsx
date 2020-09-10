import React from "react";
import { Segment, Header, Button } from "semantic-ui-react";
import { NavLink, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import { listenToCategoryFromFirestore, updateCategoryInFirestore, addCategoryToFirestore } from "../../../app/firestore/firestoreService";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { toast } from "react-toastify";
import classes from './InventoryForm.module.css';
import { listenToCategories } from "../inventoryCategoriesActions";

export default function InventoryCategoryForm({ match, history }) {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state) =>
    state.category.categories.find((c) => c.id === match.params.id)
  );

  const { loading, error } = useSelector((state) => state.async);

  const initialValues = selectedCategory ?? {
    text: "",
    value: ''
  };

  const validationSchema = Yup.object({
    text: Yup.string().required("You must provide a category"),
  });


  useFirestoreDoc({
    shouldExecute: !!match.params.id,
    query: () => listenToCategoryFromFirestore(match.params.id),
    data: (category) => dispatch(listenToCategories([category])),
    deps: [match.params.id, dispatch],
  });

  if (loading)
  return <LoadingComponent content='Loading event...' />;

if (error) return <Redirect to='/error' />;

  return (
    <Segment clearing className={classes.inventoryFormContainer}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            selectedCategory
              ? await updateCategoryInFirestore(values)
              : await addCategoryToFirestore(values)
            history.push("/inventoryCategories");
          } catch (error) {
            toast.error(error.message);
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, dirty, isValid }) => (
          <Form className='ui form' >
            <Header sub color='teal' content= {selectedCategory ? 'Edit category' :'Add category' }/>
            <MyTextInput name='text' placeholder='Category' />
            <Button
              type='submit'
              floated='right'
              className={classes.inventoryFormSubmitBtn}
              content='Submit'
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
            />
            <Button
              disabled={isSubmitting}
              type='submit'
              className={classes.inventoryFormCancelBtn}
              floated='right'
              content='Cancel'
              as={NavLink}
              to='/inventoryCategories'
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
}
