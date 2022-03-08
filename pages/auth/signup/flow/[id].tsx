import React, { useCallback, useEffect, useState } from "react";
import { Container } from "@styles/global.styles";
import { useActivateAccountMutation } from "generated/graphql";
import { useRouter } from "next/router";
import { ContentErrors } from "@components/CustomError/Error";
import { SuccessImage } from "@components/Image/Image";
import { colors } from "@styles/variables.styles";
import Loading from "@components/Loadings/Loading";
import styled from "styled-components";
import SEO from "@components/Metadata/SEO";

type ContentProps = {
  content: string;
};

const ContentWrapper = styled.div`
  max-width: 850px;
  margin: auto;
`;

const WrappAll = styled.div`
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
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
    <WrappAll>
      <ContentWrapper>
        <SuccessImage />
        <SuccesHeading>{content}</SuccesHeading>
      </ContentWrapper>
    </WrappAll>
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
      <WrappAll>
        {loading ? (
          <Loading justifycontent="center" />
        ) : errors ? (
          <ContentErrors
            content={errors}
            imgUrl="/image/_error.png"
            margin="0px auto"
          />
        ) : (
          success && (
            <ContentSucces content="🙌 Yaay. Your account has been verified. Let’s Login" />
          )
        )}
      </WrappAll>
    </Container>
  );
};

export default VerificationEmail;
