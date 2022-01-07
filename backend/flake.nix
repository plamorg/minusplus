{
    inputs = {
        flake-utils.url = github:numtide/flake-utils;
    };

    outputs = { self, nixpkgs, flake-utils }: flake-utils.lib.eachDefaultSystem (system: 
        let
            pkgs = nixpkgs.legacyPackages."${system}";
            envWithScript = script: (pkgs.buildFHSUserEnv {
                name = "wordless";
                targetPkgs = pkgs: (with pkgs; [
                    python39
                    python39Packages.python-lsp-server
                    python39Packages.pip
                    python39Packages.virtualenv
                    zlib
                ]);
                runScript = "${pkgs.writeShellScriptBin "runScript" (''
                    set -e
                    python3 -m venv .venv
                    source .venv/bin/activate
                    pip install -r requirements.txt
                    if [ ! -d .venv/lib/python3.9/site-packages/en_core_web_lg/ ]; then
                        python -m spacy download en_core_web_lg
                    fi
                '' + script)}/bin/runScript";
            }).env;
        in {
            packages.wordless = envWithScript "python main.py";
            defaultPackage = self.packages."${system}".wordless;
            devShell = envWithScript "bash";
        }
    );
}
