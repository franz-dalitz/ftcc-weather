
cache analyse:
- Geschwindigkeit
  - overhead/error handling von implementierung könnte geschw. ausgleichen oder sogar verschlechtern
  - kann auch cache-misses geben, dann ausschließlich langsamer durch zusätzl. logik
  - netzwerkprobleme relevant bei verteiltem cache
- Daten
  - wenn sich daten oft ändern schwer konsistent zu halten (invalidierungs-strategien)
- Kosten
  - cache muss am laufen gehalten / gepflegt werden
  - besonders wenn memory basiert teuer zu skalieren
  - wenn daten nur selten angefragt werden lohnt sich wahrsch. nicht
- Sicherheit
  - zusätzl. netzwerk-kommunikation => angreifbarer
  - zusätzl. software / komponenten => mehr anfällige teile
  - zusätzl. code für implementierung => mehr mögl. für human error
- Nutzererfahrung
  - möglw. inkonsistente ladezeiten? (manchmal schnell, manchmal langsam)
  - möglw. manchmal error durch daten-inkonsistenz

"doku":
- split zwischen mini front- und backends
- frontend nimmt input als längen- und breitengrade
  - und schickt dann anfrage mit koordinaten an backend
- backend schaut ob für die koordinaten schon daten im cache liegen
  - wenn nicht fragt es meteomatics nach daten
  - und schiebt sie in den cache und zurück an das frontend
- funktionale dokumentation => kommentare in den "index.js" dateien in "frontend/" und "backend/"
