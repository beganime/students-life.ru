import { Thing, WithContext } from 'schema-dts';
type JsonLdProps<T extends Thing> = {
  data: WithContext<T>;
};
export default function JsonLd<T extends Thing>({ data }: JsonLdProps<T>) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
