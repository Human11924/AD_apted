import type { ReactNode } from "react";
import { Check as IconCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/I18nProvider";

import "./PricingPage.css";

type ContainerProps = {
  className?: string;
  children: ReactNode;
};

function Container({ className = "", children }: ContainerProps) {
  return <div className={`adapted-container ${className}`.trim()}>{children}</div>;
}

export function PricingPage() {
  const { t } = useI18n();

  return (
    <main className="pricing">
      <section className="pricingMain" aria-label="Pricing">
        <Container className="pricingMain__inner">
          <header className="pricingMain__head">
            <h1 className="pricingMain__title">
              {t("Simple,")} <span className="pricingMain__accent">{t("Transparent")}</span> {t("Pricing")}
            </h1>
            <p className="pricingMain__subtitle">
              {t("Choose the plan that best fits your team's learning needs. All plans are monthly memberships that last up to 6 months.")}
            </p>
          </header>

          <div className="pricingPlans" role="list" aria-label="Plans">
            <article className="planCard" role="listitem" aria-label="Online Course plan">
              <div className="planCard__kicker">{t("Online Course")}</div>
              <div className="planCard__sub">{t("Purchase a single ready-made course")}</div>

              <div className="planCard__priceRow" aria-label="Price">
                <div className="planCard__price">$15</div>
                <div className="planCard__per">/pp, month</div>
              </div>

              <ul className="planCard__list" aria-label="Included features">
                <li className="planCard__li">
                  <IconCheck className="planCard__check" aria-hidden="true" />
                  {t("Offline event")}
                </li>
                <li className="planCard__li">
                  <IconCheck className="planCard__check" aria-hidden="true" />
                  {t("Email support")}
                </li>
                <li className="planCard__li">
                  <IconCheck className="planCard__check" aria-hidden="true" />
                  {t("Progress tracking & analytics")}
                </li>
              </ul>

              <Link className="planCard__btn" to="/contact">
                {t("Get Started")}
              </Link>
            </article>

            <article className="planCard planCard--dark" role="listitem" aria-label="Offline Course plan">
              <div className="planCard__kicker">{t("Offline Course")}</div>
              <div className="planCard__sub">{t("Create a customized course")}</div>

              <div className="planCard__priceRow" aria-label="Price">
                <div className="planCard__price">$50</div>
                <div className="planCard__per">/pp, month</div>
              </div>

              <ul className="planCard__list" aria-label="Included features">
                <li className="planCard__li">
                  <IconCheck className="planCard__check" aria-hidden="true" />
                  {t("Fully customized curriculum")}
                </li>
                <li className="planCard__li">
                  <IconCheck className="planCard__check" aria-hidden="true" />
                  {t("2 lessons with a teacher per week")}
                </li>
                <li className="planCard__li">
                  <IconCheck className="planCard__check" aria-hidden="true" />
                  {t("Priority support")}
                </li>
                <li className="planCard__li">
                  <IconCheck className="planCard__check" aria-hidden="true" />
                  {t("Progress tracking & analytics")}
                </li>
              </ul>

              <Link className="planCard__btn" to="/contact">
                {t("Get Started")}
              </Link>
            </article>
          </div>

          <div className="pricingFaq" aria-label="Frequently Asked Questions">
            <h2 className="pricingFaq__title">{t("Frequently Asked Questions")}</h2>

            <div className="pricingFaq__grid" role="list">
              <article className="faqItem" role="listitem">
                <div className="faqItem__qRow">
                  <span className="faqItem__badge" aria-hidden="true">
                    ?
                  </span>
                  <div className="faqItem__q">{t("How does the access code work?")}</div>
                </div>
                <div className="faqItem__a">
                  {t("After purchasing a course, you'll receive a unique code. Share this code with your team members. Each person enters")}
                  {" "}
                  {t("the code to create their account and access the course.")}
                </div>
              </article>

              <article className="faqItem" role="listitem">
                <div className="faqItem__qRow">
                  <span className="faqItem__badge" aria-hidden="true">
                    ?
                  </span>
                  <div className="faqItem__q">{t("Can I switch between courses?")}</div>
                </div>
                <div className="faqItem__a">
                  {t("You can switch between any online courses, as long as they have been purchased and you have access to them.")}
                </div>
              </article>

              <article className="faqItem" role="listitem">
                <div className="faqItem__qRow">
                  <span className="faqItem__badge" aria-hidden="true">
                    ?
                  </span>
                  <div className="faqItem__q">{t("What if I need a lot of seats?")}</div>
                </div>
                <div className="faqItem__a">{t("That is not a problem as you can enroll and pay for any amount of staff members.")}</div>
              </article>

              <article className="faqItem" role="listitem">
                <div className="faqItem__qRow">
                  <span className="faqItem__badge" aria-hidden="true">
                    ?
                  </span>
                  <div className="faqItem__q">{t("How long does course access last?")}</div>
                </div>
                <div className="faqItem__a">{t("Both course purchases include 6 months of access.")}</div>
              </article>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
