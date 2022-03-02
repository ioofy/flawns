import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@context/AuthContextProvider";
import { useRouter } from "next/router";
import { Container } from "@styles/global.styles";
import { useForm } from "react-hook-form";
import { useUpdateUserMutation } from "generated/graphql";

type FormDataProps = {
  username: string;
  password: string;
};

const Welcome = () => {
  const router = useRouter();
  const { loggedInUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const { email } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>();

  const [updatingUser, { data, loading }] = useUpdateUserMutation({
    onCompleted: (data) => {
      if (!data.updateUser.userErrors.length) {
        router.push("/post");
      }
    },
  });

  useEffect(() => {
    // if not null
    if (!loggedInUser?.username === null) {
      router.push("/post");
    }
  }, [loggedInUser, router]);

  useEffect(() => {
    if (data) {
      const { updateUser } = data;

      if (updateUser.userErrors.length) {
        setError(updateUser.userErrors[0].message);
      }
    }
    //  clean up next using animation
    // setTimeout(function () {
    //   setError("");
    // }, 800);
  }, [data]);

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
      <p>Welcome, {email}</p>
      <p>update your name and password</p>

      {error && <p>{error}</p>}

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
