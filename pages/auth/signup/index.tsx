import React, { useContext } from "react";
import { Base64 } from "base64-string";
import { useForm } from "react-hook-form";
import { useSignupMutation } from "generated/graphql";
import { useRouter } from "next/router";
import {
  Wrapper,
  Container,
  Cover,
  Front,
  TextWrapper,
  ImageComponent,
  Title,
  BottomWrapper,
  Content,
  FormWrapper,
  FormContent,
  SignUpForm,
  TitleForm,
  Form,
  Input,
  Label,
  InputBoxes,
  InputBox,
  ContentForm,
  ButtonRegister,
  Attributes,
  ErrorContent,
} from "@components/Pages/AuthPages/Signup/signup.styles";
import Link from "next/link";
import { patterns } from "@utils/pattern";
import { AuthContext } from "@context/AuthContextProvider";
import { toast, Toaster } from "react-hot-toast";
import SEO from "@components/Metadata/SEO";
import axios from "axios";
import Loading from "@components/Loadings/Loading";
import gravatarUrl from "gravatar-url";

type FormDataProps = {
  email: string;
  username: string;
  name: string;
  password: string;
};

const SignUp = () => {
  const enc = new Base64();
  const router = useRouter();

  const { handleAuthAction } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>();

  const [signUp, { loading }] = useSignupMutation();

  const onSubmitForm = (values: FormDataProps & Object) => {
    const { email, name, password, username } = values;

    const generateToken = enc.encode(email);

    const gravatar = gravatarUrl(email, {
      default: "identicon",
      size: 200,
    });

    // axios data
    const config: Object = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_URL}/api/verification`,
      headers: {
        "Content-Type": "application/json",
      },
      data: { ...values, generateToken },
    };

    signUp({
      variables: {
        data: {
          name,
          username,
          avatarUrl: gravatar,
          secretToken: generateToken,
        },
        credentials: {
          email,
          password,
        },
      },
      onCompleted: async (data) => {
        const { signup } = data;

        // if have error
        if (signup.userErrors.length) {
          console.log("flawns auth null");
          // set Toast error
          toast.error(signup.userErrors[0].message);
        }
        // if success
        if (!signup.userErrors.length) {
          // set Auth
          handleAuthAction("close");

          // set Toast sucess
          toast.success("Successfully created account");

          try {
            if (values) {
              const response = await axios(config);
              if (response.status == 200) {
                console.log("successfully sent email");
              }
            }
          } catch (error) {
            console.log(error);
          }

          if (!loading && !signup.userErrors.length) {
            router.push(`/auth/signup/flow/thankyou/show?username=${username}`);
          }
        }
      },
    });
  };

  return (
    <Wrapper>
      <SEO
        title="Welcome!"
        description="Lets signup and start create something interest now!"
      />
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerClassName="toaster"
      />
      <Container>
        <Cover>
          <Front>
            <ImageComponent
              src="/image/_avatar_signup.png"
              alt="avatar_signup"
            />
            <TextWrapper>
              <Title>Make a new Something now.</Title>
            </TextWrapper>
            <BottomWrapper>
              <Content>Starts now with one click</Content>
            </BottomWrapper>
          </Front>
        </Cover>
        <FormWrapper>
          <FormContent>
            <SignUpForm>
              <TitleForm>
                Welcome to <span>Flawn.</span>
              </TitleForm>
              <ContentForm>Flawn is a free comunity platforms. ✨</ContentForm>
              <Form onSubmit={handleSubmit(onSubmitForm)}>
                <InputBoxes>
                  {errors.username && (
                    <ErrorContent>*Oops enter your username</ErrorContent>
                  )}
                  <InputBox>
                    <Input
                      type="text"
                      name="username"
                      autoComplete="off"
                      placeholder="Provide your username"
                      {...register("username", {
                        required: true,
                        minLength: 1,
                      })}
                    />
                    <Label htmlFor="username">Username</Label>
                  </InputBox>
                  {errors.name && (
                    <ErrorContent>*Oops enter your name</ErrorContent>
                  )}
                  <InputBox>
                    <Input
                      type="text"
                      name="name"
                      autoComplete="off"
                      placeholder="Provide your name"
                      {...register("name", {
                        required: true,
                        minLength: 1,
                      })}
                    />
                    <Label htmlFor="name">Name</Label>
                  </InputBox>
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
                      placeholder="Provide your valid email"
                      {...register("email", {
                        required: true,
                        pattern: patterns,
                      })}
                    />
                    <Label htmlFor="email">E-mail</Label>
                  </InputBox>
                  {errors.password && (
                    <ErrorContent>*Oops enter your password</ErrorContent>
                  )}
                  <InputBox>
                    <Input
                      type="password"
                      name="password"
                      autoComplete="off"
                      placeholder="7+ strong character"
                      {...register("password", {
                        required: true,
                        minLength: 7,
                      })}
                    />
                    <Label htmlFor="password">Password</Label>
                  </InputBox>
                  <InputBox>
                    <ButtonRegister disabled={loading}>
                      {loading ? (
                        <Loading justifycontent="center" />
                      ) : (
                        `Register now`
                      )}
                    </ButtonRegister>
                  </InputBox>
                  <Attributes>
                    Already member? {""}
                    <Link href="/auth/signin">
                      <a onClick={() => handleAuthAction("signin")}>
                        Signin now
                      </a>
                    </Link>
                  </Attributes>
                </InputBoxes>
              </Form>
            </SignUpForm>
          </FormContent>
        </FormWrapper>
      </Container>
    </Wrapper>
  );
};

export default SignUp;
