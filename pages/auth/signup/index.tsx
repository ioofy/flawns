import { Base64 } from "base64-string";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useSignupMutation } from "generated/graphql";
import { useRouter } from "next/router";
import axios from "axios";
import Loading from "@components/Loading/loading";
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
  NotifGlobal,
} from "@components/Pages/AuthPages/Signup/signup.styles";
import Link from "next/link";
import { colors } from "@styles/variables.styles";
import { patterns } from "@utils/pattern";
import SEO from "@components/Metadata/SEO";

type FormDataProps = {
  email: string;
  username: string;
};

const SignUp = () => {
  const enc = new Base64();
  const router = useRouter();

  // initial state for input form
  const initialState = {
    email: "",
    username: "",
    name: "",
    password: "",
  };

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [{ email, password, name, username }, setState] =
    useState(initialState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>();

  const [signUp, { loading }] = useSignupMutation();

  // encrypt secret token
  const generateToken = enc.encode(email);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSignUpAction = useCallback(() => {
    return signUp({
      variables: {
        name,
        username,
        credentials: {
          email,
          password,
        },
        secretToken: generateToken,
      },
    });
  }, [name, email, password, generateToken, signUp, username]);

  const onSubmitForm = (values: Object) => {
    // axios data
    const config: Object = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/verification`,
      headers: {
        "Content-Type": "application/json",
      },
      data: { ...values, generateToken },
    };

    onSignUpAction().then(async (res) => {
      const {
        data: { signup },
      } = res;

      if (signup.userErrors.length) {
        setError(signup.userErrors[0].message);
      } else {
        setError("");
        setSuccess("Successfully created account");

        try {
          if (setState) {
            const response = await axios(config);
            if (response.status == 200) {
              console.log("successfully sent email");
            }
          }
        } catch (err) {
          console.log(err);
        }

        if (!loading && signup.userErrors.length === 0) {
          router.push(`/auth/signup/flow/thankyou/show?username=${username}`);
        }
      }
    });
  };

  return (
    <Wrapper>
      <SEO
        title="Welcome!"
        description="Lets signup and start create something interest now!"
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
              <NotifGlobal
                background={
                  (error && colors.error) || (success && colors.success)
                }
              >
                <p>*{(error && error) || (success && success)}</p>
              </NotifGlobal>
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
                      value={username}
                      onChange={onChange}
                    />
                    <Label htmlFor="username">Username</Label>
                  </InputBox>
                  <InputBox>
                    <Input
                      type="text"
                      name="name"
                      autoComplete="off"
                      placeholder="Provide your name"
                      value={name}
                      onChange={onChange}
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
                      value={email}
                      onChange={onChange}
                    />
                    <Label htmlFor="email">E-mail</Label>
                  </InputBox>
                  <InputBox>
                    <Input
                      type="password"
                      name="password"
                      autoComplete="off"
                      placeholder="7+ strong character"
                      value={password}
                      onChange={onChange}
                    />
                    <Label htmlFor="password">Password</Label>
                  </InputBox>
                  <InputBox>
                    <ButtonRegister>
                      {loading && error === "" ? (
                        <Loading justifycontent="center" />
                      ) : (
                        `Register now`
                      )}
                    </ButtonRegister>
                  </InputBox>
                  <Attributes>
                    Already member? {""}
                    <Link href="/auth/signin">
                      <a>Signin now</a>
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
