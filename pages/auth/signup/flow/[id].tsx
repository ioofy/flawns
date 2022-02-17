import React, { useCallback, useEffect, useState } from "react";
import { Container } from "@styles/global.styles";
import { useActivateAccountMutation } from "generated/graphql";
import { useRouter } from "next/router";
import { ContentError } from "@components/404/error";
import { SuccessImage } from "@components/Image/image";
import { colors } from "@styles/variables.styles";
import Loading from "@components/Loading/loading";
import styled from "styled-components";
import SEO from "@components/Metadata/SEO";

type ContentProps = {
  content: string;
};

const ContentWrapper = styled.div`
  max-width: 850px;
  margin: auto;
`;

const SuccesHeading = styled.h1`
  font-family: "AllianceM";
  margin-left: 28px;
  font-size: 27px;
  color: ${colors.black};
  opacity: 0.8;
  text-align: center;

  @media screen and (max-width: 820px) {
    margin-left: 0px;
    font-size: 24px;
  }
`;

const ContentSucces = (props: ContentProps) => {
  const { content } = props;
  return (
    <ContentWrapper>
      <SuccessImage />
      <SuccesHeading>{content}</SuccesHeading>
    </ContentWrapper>
  );
};

const VerificationEmail = () => {
  const router = useRouter();
  const { email, t } = router.query;

  const [ActivateAcccount, { data, loading }] = useActivateAccountMutation();
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState(false);

  const onActivate = useCallback(() => {
    // if router email and t is avaliable
    if (email || t) {
      ActivateAcccount({
        variables: {
          emailAccount: String(email),
          tokenAccount: String(t),
        },
      });
    }
  }, [ActivateAcccount, email, t]);

  useEffect(() => {
    onActivate();
  }, [onActivate]);

  useEffect(() => {
    if (data) {
      const { activationAccount } = data;

      if (activationAccount.userErrors.length) {
        setErrors(activationAccount.userErrors[0].message);
      } else {
        setSuccess(true);
      }
    }
  }, [data]);

  return (
    <Container>
      <SEO
        title="Thanks for confirming the account~"
        description="Thanks for confirming the account~"
      />
      {loading ? (
        <Loading justifycontent="center" />
      ) : errors ? (
        <ContentError
          content={errors}
          imgUrl="/image/_error.png"
          margin="0px auto"
        />
      ) : (
        success && (
          <ContentSucces content="🙌 Yaay. Your account has been verified. Let’s Login" />
        )
      )}
    </Container>
  );
};

export default VerificationEmail;