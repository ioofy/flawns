import React, { useContext, useEffect } from "react";
import { AuthContext } from "@context/AuthContextProvider";
import { useRouter } from "next/router";
import { Container } from "@styles/global.styles";
import { useForm } from "react-hook-form";
import { useUpdateUserMutation } from "generated/graphql";
import { toast, Toaster } from "react-hot-toast";
import SEO from "@components/Metadata/SEO";

type FormDataProps = {
  username: string;
  password: string;
};

const Welcome = () => {
  const router = useRouter();
  const { loggedInUser, setAuthUser } = useContext(AuthContext);
  const { email } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>();

  const [updatingUser, { loading }] = useUpdateUserMutation({
    onCompleted: (data) => {
      const { updateUser } = data;

      if (updateUser.userErrors.length) {
        toast.error(updateUser.userErrors[0].message);
      }

      if (!updateUser.userErrors.length) {
        // updating the data
        setAuthUser(updateUser.user);
      }
    },
  });

  useEffect(() => {
    // if not null
    if (loggedInUser) {
      if (loggedInUser?.username) {
        router.push("/post");
      }
    }
  }, [loggedInUser, router]);

  const onSubmitForm = (values: FormDataProps) => {
    const { username, password } = values;

    updatingUser({
      variables: {
        username,
        password,
      },
    });
  };

  return (
    <Container>
      <SEO
        title="Welcome ~ Let's setup your account"
        description="Lets create something interest now."
      />
      <p>Welcome, {email}</p>
      <p>update your name and password</p>
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerClassName="toaster"
      />
      <form
        style={{ margin: "20px 0px" }}
        onSubmit={handleSubmit(onSubmitForm)}
      >
        {errors.username && <p>*Oops please provide valid email</p>}
        <div style={{ margin: "10px 0px" }}>
          <input
            type="text"
            name="email"
            autoComplete="off"
            placeholder="Your username"
            {...register("username", {
              required: true,
            })}
          />
        </div>
        {errors.password && <p>*Oops please provide valid password</p>}
        <div style={{ margin: "10px 0px" }}>
          <input
            type="password"
            name="password"
            autoComplete="off"
            placeholder="Strong 7+ character"
            {...register("password", {
              required: true,
            })}
          />
        </div>

        <button>{loading ? "Loading.." : "Submit"}</button>
      </form>
    </Container>
  );
};

export default Welcome;
