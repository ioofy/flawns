import Link from "next/link";
import React, { useContext } from "react";
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
  SignInForm,
  TextWrapper,
  Title,
  TitleForm,
  Wrapper,
} from "@components/Pages/AuthPages/Signin/signin.styles";
import { useForm } from "react-hook-form";
import { useSigninMutation } from "generated/graphql";
import { patterns } from "@utils/pattern";
import { useRouter } from "next/router";
import { AuthContext } from "@context/AuthContextProvider";
import { toast, Toaster } from "react-hot-toast";
import Loading from "@components/Loadings/Loading";
import SEO from "@components/Metadata/SEO";
import * as FCIcons from "react-icons/fc";

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
  const { handleAuthAction, setAuthUser } = useContext(AuthContext);

  const [signIn, { loading }] = useSigninMutation({
    onCompleted: async (data) => {
      const { signin } = data;

      // if have error
      if (signin.userErrors.length) {
        console.log("flawns auth null");
        // set toast error
        toast.error(signin.userErrors[0].message);
      }
      // if success
      if (!signin.userErrors.length) {
        // set Auth
        setAuthUser(signin.user);
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

  return (
    <Wrapper>
      <SEO
        title="Hello, Welcome Back 👋"
        description="Lets signin and share your idea!"
      />
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerClassName="toaster-error"
      />
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
                    <button
                      style={{
                        margin: "10px",
                        padding: "8px",
                        color: "black",
                        display: "flex",
                        fontSize: "15px",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#fff",
                      }}
                    >
                      <FCIcons.FcGoogle
                        size={20}
                        style={{ marginRight: "5px" }}
                      />
                      Login with Google
                    </button>
                  </Link>
                  <p style={{ textAlign: "center" }}>Or</p>
                </TitleForm>

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
