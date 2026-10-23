import Link from "next/link";
export const metadata = { title: "Your first visit" };
export default function FirstVisit() {
  return (
    <article className="editorial-page">
      <header className="editorial-heading">
        <span className="editorial-label">
          A LITTLE PREPARATION. A STRONG START.
        </span>
        <h1>
          Your first day.
          <br />
          <em>Your own pace.</em>
        </h1>
        <p>
          You don’t need experience to get started. Here’s how to make your
          first visit feel familiar.
        </p>
      </header>
      <div className="article-body">
        <h2>Before you arrive</h2>
        <p>
          Contact the team to arrange a time and confirm what your visit
          includes. Let us know whether you want to explore the gym, try a
          class, or discuss coaching.
        </p>
        <h2>What to bring</h2>
        <ol>
          <li>Comfortable training clothes and clean, supportive trainers.</li>
          <li>A water bottle and a small towel.</li>
          <li>Your questions. We’re here to help you feel at home.</li>
        </ol>
        <h2>Start with a conversation</h2>
        <p>
          Arrive a little early so there’s time to meet the team, see the space,
          and discuss your experience. Your coach can help you choose an
          appropriate starting point.
        </p>
        <h2>Make it your session</h2>
        <p>
          You can ask questions, take breaks, and work at a pace that feels
          manageable. Share any concerns with your coach before you begin.
        </p>
        <h2>Decide what comes next</h2>
        <p>
          After your visit, explore the{" "}
          <Link href="/pricing">membership options</Link> or talk about a
          training routine that fits your week.
        </p>
        <Link className="inline-link" href="/contact">
          Arrange your first visit ↗
        </Link>
      </div>
    </article>
  );
}
