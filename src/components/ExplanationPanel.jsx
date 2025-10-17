function ExplanationPanel({ explanation }) {
  return (
    <section className="panel explanation-panel">
      <h2>Step-by-Step Explanation</h2>
      <div className="explanation-content">
        {explanation ? (
          <div dangerouslySetInnerHTML={{ __html: explanation }} />
        ) : (
          <p className="placeholder">
            Select a cipher and click <strong>Run</strong> to see the mathematical breakdown.
          </p>
        )}
      </div>
    </section>
  )
}

export default ExplanationPanel
