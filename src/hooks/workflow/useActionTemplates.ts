import axios from "axios";
import { useEffect, useState } from "react";

export function useActionTemplates() {
  const [actionTemplates, setActionTemplates] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("/api/v1/internal/action-templates");
      setActionTemplates(res.data)
    };
    fetch();
  }, []);
  return actionTemplates;
}
