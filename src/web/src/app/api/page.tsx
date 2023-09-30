'use client';

import { useEffect } from "react";
import { SwaggerUIBundle } from "swagger-ui-dist";
import "swagger-ui-dist/swagger-ui.css";

export default function SwaggerDocs() {
  useEffect(() => {
    SwaggerUIBundle({
      url: "/api/v1",
      dom_id: '#swagger-ui',
    })
  }, []);

  return <div id="swagger-ui"></div>;
}
