import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useUsers } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useEffect, useState } from 'react';

export function UserForm() {
  const { createUser, getUser, updateUser } = useUsers();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    names: '',
    email: '',
    image: null,
  });
  const params = useParams();

  useEffect(() => {
    (async () => {
      if (params.id) {
        const user = await getUser(params.id);
        setUser({
          names: user.names,
          email: user.email,
        });
      }
    })();
  }, [params.id, getUser]);

  return (
    <div className="flex items-center justify-center">
      <div className="bg-cyan-600 p-10 shadow-md shadow-slate-400 rounded-md">
        <header className="flex justify-between items-center py-4 text-white">
          <h3 className="text-xl">User</h3>
          <Link to="/administrator" className="text-gray-600 text-sm">
            Go Back
          </Link>
        </header>
        <Formik
          initialValues={user}
          enableReinitialize
          validationSchema={Yup.object({
            names: Yup.string().required('Name is Required'),
            email: Yup.string().required('Email is Required'),
          })}
          onSubmit={async (values, actions) => {
            if (params.id) {
              await updateUser(params.id, values);
            } else {
              await createUser(values);
            }
            actions.resetForm();
            actions.setSubmitting(false);
            navigate('/administrator');
          }}
        >
          {({ setFieldValue, isSubmitting, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <label
                htmlFor="names"
                className="text-sm block font-bold mb-2 text-white"
              >
                Names
              </label>
              <Field
                className="px-3 py-2 focus:outline-none rounded  w-full"
                placeholder="Name"
                name="names"
              />
              <ErrorMessage
                component="p"
                name="names"
                className="text-red-500 text-sm"
              />

              <label
                htmlFor="email"
                className="text-sm block font-bold mb-2 text-white"
              >
                Email
              </label>
              <Field
                name="email"
                id="email"
                placeholder="email@example.com"
                className="px-3 py-2 focus:outline-none rounded  w-full"
              />
              <ErrorMessage
                component="p"
                name="email"
                className="text-red-500 text-sm"
              />

              <label
                htmlFor="image"
                className="text-sm block font-bold mb-2 text-white"
              >
                Image
              </label>
              <input
                type="file"
                name="image"
                className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-gray-600
                hover:file:bg-violet-100"
                onChange={(e) => setFieldValue('image', e.target.files[0])}
              />
              <ErrorMessage
                component="p"
                name="image"
                className="text-red-400 text-sm"
              />

              <button
                type="submit"
                className="bg-orange-600 px-4 py-2 rounded mt-2 text-white focus:outline-none disabled:bg-orange-400"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
                ) : (
                  'save'
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
