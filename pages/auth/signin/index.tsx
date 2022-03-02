import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import {
  Attributes,
  Back,
  BottomWrapper,
  ButtonLogin,
  Container,
  Content,
  Cover,
  ErrorContent,
  Form,
  FormContent,
  FormWrapper,
  Front,
  ImageComponent,
  Input,
  InputBox,
  InputBoxes,
  Label,
  NotifGlobal,
  SignInForm,
  TextWrapper,
  Title,
  TitleForm,
  Wrapper,
} from "@components/Pages/AuthPages/Signin/signin.styles";
import { useForm } from "react-hook-form";
import { colors } from "@styles/variables.styles";
import { useSigninMutation } from "generated/graphql";
import { patterns } from "@utils/pattern";
import { useRouter } from "next/router";
import { AuthContext } from "@context/AuthContextProvider";
import Loading from "@components/Loading/loading";
import SEO from "@components/Metadata/SEO";

type FormDataProps = {
  email: string;
  password: string;
};

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>();

  const router = useRouter();
  const [error, setError] = useState("");
  const { handleAuthAction } = useContext(AuthContext);

  const [signIn, { data, loading }] = useSigninMutation({
    onCompleted: (data) => {
      // if have error
      if (data.signin.userErrors.length) {
        console.log("flawns auth null");
      }
      // if success
      if (data.signin.userErrors.length === 0) {
        // push
        router.push("/post");
      }
    },
  });

  const onSubmitForm = (values: FormDataProps) => {
    const { email, password } = values;

    signIn({
      variables: {
        credentials: {
          email,
          password,
        },
      },
    });
  };

  useEffect(() => {
    if (data) {
      const { signin } = data;

      if (signin.userErrors.length) {
        setError(signin.userErrors[0].message);
      }
    }

    //  clean up next using animation
    setTimeout(function () {
      setError("");
    }, 800);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Wrapper>
      <SEO title="Hello!" description="Lets signin and share your idea!" />
      <Container>
        <Cover>
          <Back>
            <ImageComponent
              src="/image/_avatar_signin.png"
              alt="avatar_signin"
            />
            <TextWrapper>
              <Title>What’s your Idea? Lets share.</Title>
            </TextWrapper>
            <BottomWrapper>
              <Content>Sign-in to continue.</Content>
            </BottomWrapper>
          </Back>
        </Cover>
        <Front>
          <FormWrapper>
            <FormContent>
              <SignInForm>
                <TitleForm>
                  Welcome Back👋 <p>Lets start with one click✨</p>
                  <Link href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google`}>
                    <button style={{ margin: "10px", padding: "8px" }}>
                      Login with Google
                    </button>
                  </Link>
                  <p style={{ textAlign: "center" }}>Or</p>
                </TitleForm>

                <NotifGlobal background={error && colors.error}>
                  <p>*{error}</p>
                </NotifGlobal>

                <Form onSubmit={handleSubmit(onSubmitForm)}>
                  <InputBoxes>
                    {errors.email && (
                      <ErrorContent>
                        *Oops please provide valid email
                      </ErrorContent>
                    )}
                    <InputBox>
                      <Input
                        type="text"
                        name="email"
                        autoComplete="off"
                        placeholder="Example@yourmail.com"
                        {...register("email", {
                          required: true,
                          pattern: patterns,
                        })}
                      />
                      <Label htmlFor="username">E-mail</Label>
                    </InputBox>
                    {errors.password && (
                      <ErrorContent>
                        *Oops please provide valid password
                      </ErrorContent>
                    )}
                    <InputBox>
                      <Input
                        type="password"
                        name="password"
                        autoComplete="off"
                        placeholder="Strong 7+ character"
                        {...register("password", {
                          required: true,
                        })}
                      />
                      <Label htmlFor="username">Password</Label>
                    </InputBox>
                    <InputBox>
                      <ButtonLogin>
                        {loading ? (
                          <Loading justifycontent="center" />
                        ) : (
                          `Sign-in`
                        )}
                      </ButtonLogin>
                    </InputBox>
                    <Attributes>
                      Forgotting Password? {""}
                      <Link href="/auth/signin/flow/reset-password">
                        <a>Reset now</a>
                      </Link>
                    </Attributes>
                    <Attributes>
                      New to Flawn? {""}
                      <Link href="/auth/signup">
                        <a onClick={() => handleAuthAction("signup")}>
                          Register now
                        </a>
                      </Link>
                    </Attributes>
                  </InputBoxes>
                </Form>
              </SignInForm>
            </FormContent>
          </FormWrapper>
        </Front>
      </Container>
    </Wrapper>
  );
};
export default SignIn;
