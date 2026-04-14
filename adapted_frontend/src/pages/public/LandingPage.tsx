import type { ReactNode } from "react";
import {
  BookOpen as IconBook,
  Bolt as IconBolt,
  Check as IconCheck,
  Clock3 as IconClock,
  GraduationCap as IconCap,
  Headset as IconHeadset,
  KeyRound as IconKey,
  Lightbulb as IconBulb,
  Search as IconSearch,
  ShoppingCart as IconCart,
  Users as IconUsers,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/I18nProvider";

import "./LandingPage.css";

type ContainerProps = {
  className?: string;
  children: ReactNode;
};

function Container({ className = "", children }: ContainerProps) {
  return <div className={`adapted-container ${className}`.trim()}>{children}</div>;
}

export function LandingPage() {
  const { t } = useI18n();

  return (
    <main className="home">
      <section className="homeHero" aria-label="Hero">
        <Container className="homeHero__inner">
          <div className="homeHero__copy">
            <h1 className="homeHero__title">
              <span className="homeHero__titleLine">{t("Customized trainings.")}</span>
              <span className="homeHero__titleLine">{t("Effective results.")}</span>
            </h1>

            <div className="homeHero__kicker">{t("Transform Your Team's English Skills")}</div>

            <p className="homeHero__desc">
              {t("Customizable English courses designed for businesses.")}
              <br />
              {t("Choose from ready-made industry-specific programs or create tailored courses.")}
            </p>

            <div className="homeHero__actions">
              <Link className="homeBtn homeBtn--primary" to="/contact">
                {t("Send Request")}
              </Link>
              <Link className="homeBtn homeBtn--secondary" to="/pricing">
                {t("View Pricing")}
              </Link>
            </div>
          </div>

          <aside className="homeHero__stats" aria-label="Highlights">
            <div className="homeHero__stat">
              <span className="homeHero__statIcon" aria-hidden="true">
                <IconBook className="homeHero__svg" />
              </span>
              <div className="homeHero__statText">
                <div className="homeHero__statTitle">20+</div>
                <div className="homeHero__statSub">{t("Online Courses")}</div>
              </div>
            </div>

            <div className="homeHero__stat">
              <span className="homeHero__statIcon" aria-hidden="true">
                <IconUsers className="homeHero__svg" />
              </span>
              <div className="homeHero__statText">
                <div className="homeHero__statTitle">{t("Unlimited")}</div>
                <div className="homeHero__statSub">{t("Team Members per Course")}</div>
              </div>
            </div>

            <div className="homeHero__stat">
              <span className="homeHero__statIcon" aria-hidden="true">
                <IconCheck className="homeHero__svg" />
              </span>
              <div className="homeHero__statText">
                <div className="homeHero__statTitle">{t("5 levels")}</div>
                <div className="homeHero__statSub">{t("From Beginner to Advanced")}</div>
              </div>
            </div>
          </aside>
        </Container>
      </section>

      <section className="homeWhy" aria-label="Why Choose AdaptEd">
        <Container className="homeWhy__inner">
          <div className="homeWhy__head">
            <h2 className="homeWhy__title">{t("Why Choose AdaptEd?")}</h2>
            <p className="homeWhy__subtitle">
              {t("Everything you need to upskill your team's English proficiency in one")}
              <br />
              {t("comprehensive platform.")}
            </p>
          </div>

          <div className="homeWhy__grid">
            <article className="homeWhyCard">
              <div className="homeWhyCard__icon homeWhyCard__icon--gold" aria-hidden="true">
                <IconBook className="homeWhyCard__svg" />
              </div>
              <h3 className="homeWhyCard__title">{t("Ready-Made Courses")}</h3>
              <p className="homeWhyCard__desc">
                {t("Industry-specific courses like English for Waiters, Front Desk, and Clerks ready to deploy.")}
              </p>
            </article>

            <article className="homeWhyCard">
              <div className="homeWhyCard__icon homeWhyCard__icon--dark" aria-hidden="true">
                <IconBolt className="homeWhyCard__svg" />
              </div>
              <h3 className="homeWhyCard__title">{t("Custom Courses")}</h3>
              <p className="homeWhyCard__desc">{t("Tailor courses to your business needs and industry requirements.")}</p>
            </article>

            <article className="homeWhyCard">
              <div className="homeWhyCard__icon homeWhyCard__icon--gold" aria-hidden="true">
                <IconUsers className="homeWhyCard__svg" />
              </div>
              <h3 className="homeWhyCard__title">{t("Team Access")}</h3>
              <p className="homeWhyCard__desc">
                {t("Enroll any amount of team members per course with secure code access.")}
              </p>
            </article>

            <article className="homeWhyCard">
              <div className="homeWhyCard__icon homeWhyCard__icon--dark" aria-hidden="true">
                <IconClock className="homeWhyCard__svg" />
              </div>
              <h3 className="homeWhyCard__title">{t("Flexible Learning")}</h3>
              <p className="homeWhyCard__desc">
                {t("Choose between online self-paced courses or offline sessions with teachers.")}
              </p>
            </article>

            <article className="homeWhyCard">
              <div className="homeWhyCard__icon homeWhyCard__icon--gold" aria-hidden="true">
                <IconBulb className="homeWhyCard__svg" />
              </div>
              <h3 className="homeWhyCard__title">{t("5 Proficiency Levels")}</h3>
              <p className="homeWhyCard__desc">{t("From Beginner to Advanced, courses for every skill level.")}</p>
            </article>

            <article className="homeWhyCard">
              <div className="homeWhyCard__icon homeWhyCard__icon--dark" aria-hidden="true">
                <IconHeadset className="homeWhyCard__svg" />
              </div>
              <h3 className="homeWhyCard__title">{t("Expert Support")}</h3>
              <p className="homeWhyCard__desc">{t("Professional teachers for offline courses and ongoing support.")}</p>
            </article>
          </div>
        </Container>
      </section>

      <section className="homeHow" aria-label="How It Works">
        <Container className="homeHow__inner">
          <div className="homeHow__head">
            <h2 className="homeHow__title">
              {t("How It")} <span className="homeHow__titleAccent">{t("Works")}</span>
            </h2>
            <p className="homeHow__subtitle">{t("Get your team started with AdaptEd in four simple steps.")}</p>
          </div>

          <div className="homeHow__steps" role="list" aria-label="Steps">
            <div className="homeHowStep" role="listitem">
              <div className="homeHowStep__iconWrap">
                <div className="homeHowStep__icon" aria-hidden="true">
                  <IconSearch className="homeHowStep__svg" />
                </div>
                <div className="homeHowStep__num" aria-hidden="true">
                  1
                </div>
              </div>
              <div className="homeHowStep__title">{t("Choose Your Course")}</div>
              <div className="homeHowStep__desc">
                {t("Browse ready-made industry courses or customize your own based on your team's needs.")}
              </div>
            </div>

            <div className="homeHowStep" role="listitem">
              <div className="homeHowStep__iconWrap">
                <div className="homeHowStep__icon" aria-hidden="true">
                  <IconCart className="homeHowStep__svg" />
                </div>
                <div className="homeHowStep__num" aria-hidden="true">
                  2
                </div>
              </div>
              <div className="homeHowStep__title">{t("Select Your Plan")}</div>
              <div className="homeHowStep__desc">
                {t("Pick your membership - either online course or offline sessions tailored to your business.")}
              </div>
            </div>

            <div className="homeHowStep" role="listitem">
              <div className="homeHowStep__iconWrap">
                <div className="homeHowStep__icon" aria-hidden="true">
                  <IconKey className="homeHowStep__svg" />
                </div>
                <div className="homeHowStep__num" aria-hidden="true">
                  3
                </div>
              </div>
              <div className="homeHowStep__title">{t("Get Access Code")}</div>
              <div className="homeHowStep__desc">{t("Receive a unique code for your team members to access the course.")}</div>
            </div>

            <div className="homeHowStep" role="listitem">
              <div className="homeHowStep__iconWrap">
                <div className="homeHowStep__icon" aria-hidden="true">
                  <IconCap className="homeHowStep__svg" />
                </div>
                <div className="homeHowStep__num" aria-hidden="true">
                  4
                </div>
              </div>
              <div className="homeHowStep__title">{t("Start Learning")}</div>
              <div className="homeHowStep__desc">
                {t("Your team enters the code and begins their English learning journey.")}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="homeCta" aria-label="Send Request">
        <Container className="homeCta__inner">
          <h2 className="homeCta__title">
            {t("Ready to Transform Your Team's")}
            <br />
            <span className="homeCta__accent">{t("English Skills")}</span>?
          </h2>
          <p className="homeCta__subtitle">{t("Join businesses that trust AdaptEd for their team's English learning journey.")}</p>
          <Link className="homeCta__btn" to="/contact">
            {t("Send Request")}
          </Link>
        </Container>
      </section>
    </main>
  );
}
