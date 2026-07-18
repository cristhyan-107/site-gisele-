import { ImageResponse } from "next/og";

export const socialImageAlt =
  "Dra. Gisele Gabriel — atendimento jurídico claro e individualizado";

export const socialImageSize = {
  width: 1200,
  height: 630,
};

export const socialImageContentType = "image/png";

export function createSocialImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: "#091a31",
        color: "#ffffff",
        padding: "72px 84px",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 560,
          height: 560,
          borderRadius: 999,
          right: -180,
          top: -220,
          background: "rgba(167, 125, 53, 0.28)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 28,
          display: "flex",
          border: "1px solid rgba(215, 182, 110, 0.34)",
          borderRadius: 32,
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            color: "#d7b66e",
            fontSize: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(215, 182, 110, 0.55)",
              borderRadius: 16,
              fontSize: 24,
              color: "#ffffff",
            }}
          >
            GG
          </div>
          Atendimento jurídico
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              maxWidth: 900,
              fontFamily: "serif",
              fontSize: 70,
              lineHeight: 1.05,
            }}
          >
            Orientação clara para situações que exigem atenção
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 27,
              color: "#d7dce4",
            }}
          >
            Planos de saúde · Seguros · Direito do consumidor
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 25, color: "#d7b66e" }}>
          Dra. Gisele Gabriel · OAB/GO 57.455
        </div>
      </div>
    </div>,
    socialImageSize,
  );
}
