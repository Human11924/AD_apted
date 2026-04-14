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

import "./LandingPage.css";

type ContainerProps = {
  className?: string;
  children: ReactNode;
};

function Container({ className = "", children }: ContainerProps) {
  return <div className={`adapted-container ${className}`.trim()}>{children}</div>;
}

export function LandingPage() {
  return (
    <main className="home">
      <section className="homeHero" aria-label="Hero">
        <Container className="homeHero__inner">
          <div className="homeHero__copy">
            <h1 className="homeHero__title">
              <span className="homeHero__titleLine">Customized trainings.</span>
              <span className="homeHero__titleLine">Effective results.</span>
            </h1>

            <div className="homeHero__kicker">Transform Your Team&apos;s English Skills</div>

            <p className="homeHero__desc">
              Customizable English courses designed for businesses.
              <br />
              Choose from ready-made industry-specific programs or create tailored courses.
            </p>

            <div className="homeHero__actions">
              <Link className="homeBtn homeBtn--primary" to="/contact">
                Send Request
              </Link>
              <Link className="homeBtn homeBtn--secondary" to="/pricing">
                View Pricing
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
                <div className="homeHero__statSub">Online Courses</div>
              </div>
            </div>

            <div className="homeHero__stat">
              <span className="homeHero__statIcon" aria-hidden="true">
                <IconUsers className="homeHero__svg" />
              </span>
              <div className="homeHero__statText">
                <div className="homeHero__statTitle">Unlimited</div>
                <div className="homeHero__statSub">Team Members per Course</div>
              </div>
            </div>

            <div className="homeHero__stat">
              <span className="homeHero__statIcon" aria-hidden="true">
                <IconCheck className="homeHero__svg" />
              </span>
              <div className="homeHero__statText">
                <div className="homeHero__statTitle">5 levels</div>
                <div className="homeHero__statSub">From Beginner to Advanced</div>
              </div>
            </div>
          </aside>
        </Container>
      </section>

      <section className="homeWhy" aria-label="Why Choose AdaptEd">
        <Container className="homeWhy__inner">
          <div className="homeWhy__head">
            <h2 className="homeWhy__title">Why Choose AdaptEd?</h2>
            <p className="homeWhy__subtitle">
              Everything you need to upskill your team&apos;s English proficiency in one
              <br />
              comprehensive platform.
            </p>
          </div>

          <div className="homeWhy__grid">
            <article className="homeWhyCard">
              <div className="homeWhyCard__icon homeWhyCard__icon--gold" aria-hidden="true">
                <IconBook className="homeWhyCard__svg" />
              </div>
              <h3 className="homeWhyCard__title">Ready-Made Courses</h3>
              <p className="homeWhyCard__desc">
                Industry-specific courses like English for Waiters, Front Desk, and Clerks ready to deploy.
              </p>
            </article>

            <article className="homeWhyCard">
              <div className="homeWhyCard__icon homeWhyCard__icon--dark" aria-hidden="true">
                <IconBolt className="homeWhyCard__svg" />
              </div>
              <h3 className="homeWhyCard__title">Custom Courses</h3>
              <p className="homeWhyCard__desc">Tailor courses to your business needs and industry requirements.</p>
            </article>

            <article className="homeWhyCard">
              <div className="homeWhyCard__icon homeWhyCard__icon--gold" aria-hidden="true">
                <IconUsers className="homeWhyCard__svg" />
              </div>
              <h3 className="homeWhyCard__title">Team Access</h3>
              <p className="homeWhyCard__desc">
                Enroll any amount of team members per course with secure code access.
              </p>
            </article>

            <article className="homeWhyCard">
              <div className="homeWhyCard__icon homeWhyCard__icon--dark" aria-hidden="true">
                <IconClock className="homeWhyCard__svg" />
              </div>
              <h3 className="homeWhyCard__title">Flexible Learning</h3>
              <p className="homeWhyCard__desc">
                Choose between online self-paced courses or offline sessions with teachers.
              </p>
            </article>

            <article className="homeWhyCard">
              <div className="homeWhyCard__icon homeWhyCard__icon--gold" aria-hidden="true">
                <IconBulb className="homeWhyCard__svg" />
              </div>
              <h3 className="homeWhyCard__title">5 Proficiency Levels</h3>
              <p className="homeWhyCard__desc">From Beginner to Advanced, courses for every skill level.</p>
            </article>

            <article className="homeWhyCard">
              <div className="homeWhyCard__icon homeWhyCard__icon--dark" aria-hidden="true">
                <IconHeadset className="homeWhyCard__svg" />
              </div>
              <h3 className="homeWhyCard__title">Expert Support</h3>
              <p className="homeWhyCard__desc">Professional teachers for offline courses and ongoing support.</p>
            </article>
          </div>
        </Container>
      </section>

      <section className="homeHow" aria-label="How It Works">
        <Container className="homeHow__inner">
          <div className="homeHow__head">
            <h2 className="homeHow__title">
              How It <span className="homeHow__titleAccent">Works</span>
            </h2>
            <p className="homeHow__subtitle">Get your team started with AdaptEd in four simple steps.</p>
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
              <div className="homeHowStep__title">Choose Your Course</div>
              <div className="homeHowStep__desc">
                Browse ready-made industry courses or customize your own based on your team&apos;s needs.
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
              <div className="homeHowStep__title">Select Your Plan</div>
              <div className="homeHowStep__desc">
                Pick your membership - either online course or offline sessions tailored to your business.
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
              <div className="homeHowStep__title">Get Access Code</div>
              <div className="homeHowStep__desc">Receive a unique code for your team members to access the course.</div>
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
              <div className="homeHowStep__title">Start Learning</div>
              <div className="homeHowStep__desc">
                Your team enters the code and begins their English learning journey.
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="homeCta" aria-label="Send Request">
        <Container className="homeCta__inner">
          <h2 className="homeCta__title">
            Ready to Transform Your Team&apos;s
            <br />
            <span className="homeCta__accent">English Skills</span>?
          </h2>
          <p className="homeCta__subtitle">Join businesses that trust AdaptEd for their team&apos;s English learning journey.</p>
          <Link className="homeCta__btn" to="/contact">
            Send Request
          </Link>
        </Container>
      </section>
    </main>
  );
}
