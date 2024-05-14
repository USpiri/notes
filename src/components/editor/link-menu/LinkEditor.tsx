import { ChangeEvent, FormEvent, useCallback, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Check, Link } from "lucide-react";

interface LinkEditorProps {
  url?: string;
  newTab?: boolean;
  onSetLink: (url: string, openInNewTab?: boolean) => void;
}

export const useLinkEditorState = ({
  url: initialUrl,
  newTab: initialOpenInNewTab,
  onSetLink,
}: LinkEditorProps) => {
  const [url, setUrl] = useState(initialUrl || "");
  const [openInNewTab, setOpenInNewTab] = useState(
    initialOpenInNewTab || false,
  );

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  }, []);

  const isValidUrl = useMemo(
    () => /^https?:\/\//.test(url) || /^\/?\?note=/.test(url),
    [url],
  );

  const hangleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      if (isValidUrl) onSetLink(url, openInNewTab);
    },
    [url, isValidUrl, openInNewTab, onSetLink],
  );

  return {
    url,
    setUrl,
    openInNewTab,
    setOpenInNewTab,
    onChange,
    hangleSubmit,
    isValidUrl,
  };
};

export const LinkEditor = ({ url, newTab, onSetLink }: LinkEditorProps) => {
  const state = useLinkEditorState({ url, newTab, onSetLink });

  return (
    <div className="rounded border border-neutral-700 bg-neutral-950 p-1">
      <div className="mb-1.5 px-2 py-0.5 text-sm text-neutral-300">
        <label className="flex items-center justify-between">
          Open in new tab
          <Switch
            checked={state.openInNewTab}
            onCheckedChange={state.setOpenInNewTab}
          />
        </label>
      </div>
      <form className="flex gap-1" onSubmit={state.hangleSubmit}>
        <label className="flex items-center gap-2 rounded border border-neutral-800 px-1.5 py-1">
          <Link className="h-4 w-4" />
          <input
            type="url"
            placeholder="Enter URL"
            className="flex-1 bg-transparent text-sm text-neutral-400 outline-none"
            value={state.url}
            onChange={state.onChange}
          />
        </label>
        <Button
          size="icon"
          variant="ghost"
          className="h-[unset] w-[unset] rounded border border-transparent p-1 text-green-400 disabled:bg-neutral-800 disabled:text-neutral-500"
          aria-label="Submit url"
          type="submit"
          disabled={!state.isValidUrl}
        >
          <Check className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};
