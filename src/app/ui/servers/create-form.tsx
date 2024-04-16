"use client";

import { useFormState } from "react-dom";
import { createServer } from "../../lib/servers/actions";

export default function Form() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createServer, initialState);

  return (
    <form action={dispatch}>
      <div>
        <div className="mb-4">
          {state.errors?.name &&
            state.errors.name.map((error: string) => (
              <p key={error}>{error}</p>
            ))}
          <label>Server Name</label>
          <input id="name" name="name" type="text" placeholder="Server Name" />
        </div>
        <div className="mb-4">
          {state.errors?.description &&
            state.errors.description.map((error: string) => (
              <p key={error}>{error}</p>
            ))}
          <label>Description</label>
          <input id="description" name="description" type="text" />
        </div>
        <div>
          {state.errors?.isPublic &&
            state.errors.isPublic.map((error: string) => (
              <p key={error}>{error}</p>
            ))}
          <label>Public Server?</label>
          <input id="isPublic" name="isPublic" type="checkbox" />
        </div>
        <button type="submit">Create Server</button>
      </div>
    </form>
  );
}
