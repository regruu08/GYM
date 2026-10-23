import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, MoveDown } from "lucide-react";
import { programs, amenities } from "@/data/gymData";
import { HomePricingSection } from "@/components/HomePricingSection";
import styles from "./home.module.css";

export default function HomePage() {
  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>
            <span /> STRENGTH. CONDITIONING. COMMUNITY.
          </p>
          <h1>
            Built through
            <br />
            effort.
            <br />
            <em>Made for you.</em>
          </h1>
          <p className={styles.intro}>
            A place to put in the work. Coaching that meets you where you are.
            Discover a stronger everyday at IronForge.
          </p>
          <div className={styles.actions}>
            <Link className={styles.primary} href="/contact">
              Find your starting point <ArrowUpRight size={18} />
            </Link>
            <Link className={styles.textLink} href="/programs">
              Explore training <ArrowRight size={17} />
            </Link>
          </div>
          <div className={styles.heroFoot}>
            <span>YOUR PACE. YOUR PROGRESS.</span>
            <a href="#training" aria-label="Discover training">
              <MoveDown size={19} />
            </a>
          </div>
        </div>
        <div className={styles.heroImage}>
          <Image
            src="/images/training-floor.jpg"
            alt="Strength training floor with weights and training equipment"
            fill
            priority
            sizes="100vw"
          />
          <div className={styles.imageLabel}>
            <span className={styles.cardEyebrow}>
              <span /> THE IRONFORGE STANDARD
            </span>
            <p>
              Less distraction.
              <br />
              More dedication.
            </p>
            <div className={styles.cardBottom}>
              <span>01 / THE TRAINING FLOOR</span>
              <ArrowUpRight size={22} />
            </div>
          </div>
          <div className={styles.imageTag}>SHOW UP FOR YOURSELF. ↗</div>
        </div>
      </section>
      <div className={styles.disciplines}>
        {[
          "Strength with purpose",
          "Coaching with care",
          "Room to recover",
          "Progress that lasts",
        ].map((s, i) => (
          <span key={s}>
            <small>0{i + 1}</small>
            {s}
          </span>
        ))}
      </div>
      <section className={styles.section} id="training">
        <div className={styles.sectionTop}>
          <div>
            <p className={styles.eyebrow}>01 / FIND YOUR PRACTICE</p>
            <h2>
              Different goals.
              <br />
              <em>One place to begin.</em>
            </h2>
          </div>
          <div>
            <p>
              Start with what moves you. Build strength, find your rhythm, and
              make training a part of your life.
            </p>
            <Link className={styles.textLink} href="/programs">
              All programs & schedule <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
        <div className={styles.programs}>
          {programs.slice(0, 3).map((p, i) => (
            <Link
              href={`/programs#${p.id}`}
              className={styles.program}
              key={p.id}
            >
              <div className={styles.programImage}>
                <Image
                  src={p.imageUrl}
                  alt={p.name}
                  fill
                  sizes="(max-width: 700px) 100vw, 33vw"
                />
                <span>0{i + 1}</span>
                <ArrowUpRight className={styles.programArrow} />
              </div>
              <div className={styles.programMeta}>
                <span>{p.category}</span>
                <span>{p.duration}</span>
              </div>
              <h3>{p.name}</h3>
              <p>{p.tagline}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className={styles.philosophy}>
        <div className={styles.philosophyPhoto}>
          <Image
            src={amenities[0].imageUrl}
            alt="Equipment for focused strength training"
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
          />
        </div>
        <div className={styles.philosophyCopy}>
          <p className={styles.eyebrow}>02 / THE WAY WE TRAIN</p>
          <h2>
            Good training.
            <br />
            <em>No shortcuts.</em>
          </h2>
          <p>
            Getting stronger isn’t about doing everything at once. It’s about
            learning the fundamentals, showing up consistently, and having the
            right people in your corner.
          </p>
          {[
            [
              "A solid foundation",
              "Learn the movement before you add the weight.",
            ],
            [
              "Support along the way",
              "Work with coaches who understand your starting point.",
            ],
            [
              "Space to reset",
              "Make recovery part of the routine, not an afterthought.",
            ],
          ].map(([title, text], i) => (
            <div className={styles.principle} key={title}>
              <span>0{i + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </div>
          ))}
          <Link href="/trainers" className={styles.textLink}>
            Meet your coaches <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <HomePricingSection />
      <section className={styles.visit}>
        <p className={styles.eyebrow}>YOUR NEXT CHAPTER STARTS HERE</p>
        <h2>
          You don’t have to be ready.
          <br />
          <em>Just ready to start.</em>
        </h2>
        <p>
          Come see the space, meet a coach, and talk about what you want from
          your training.
        </p>
        <Link href="/contact" className={styles.primary}>
          Plan your first visit <ArrowUpRight size={18} />
        </Link>
        <Link href="/first-visit" className={styles.textLink}>
          What to expect <ArrowRight size={17} />
        </Link>
      </section>
    </div>
  );
}
