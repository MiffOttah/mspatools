using System;
using System.Collections.Generic;
using System.IO;

internal class Program
{
    internal static void Main(string[] args)
    {
        string fileName = args.Length > 0 ? args[0] : "traits.txt";
        if (File.Exists(fileName))
        {
            List<string> Trolls = new List<string>();
            List<string> BloodColors = new List<string>();
            List<List<int>> BaseTraits = new List<List<int>>();

            Dictionary<int, string> MasterTraitList = new Dictionary<int, string>();
            Dictionary<string, int> ReverseMasterTraitList = new Dictionary<string, int>();
            Dictionary<int, List<int>> IncompatbilityList = new Dictionary<int, List<int>>();

            List<int> currentTrollTraits = null;
            bool incompatibility = false;

            try
            {
                using (StreamReader inFile = new StreamReader(File.Open(fileName, FileMode.Open, FileAccess.Read)))
                {
                    string line;
                    while ((line = inFile.ReadLine()) != null)
                    {
                        if (line.StartsWith("[Troll:"))
                        {
                            string trollInfo = line.Substring(7).Trim();
                            trollInfo = trollInfo.Remove(trollInfo.Length - 1);

                            int n = trollInfo.IndexOf(',');
                            if (n < 0) throw new Exception("Invalid troll line.");

                            string trollName = trollInfo.Remove(n).Trim();
                            string trollColor = trollInfo.Substring(n + 1).Trim();

                            Trolls.Add(trollName);
                            BloodColors.Add(trollColor);
                            currentTrollTraits = new List<int>();

                            Console.WriteLine("Reading troll block for {0}.", trollName);
                        }
                        else if (line == "[/Troll]")
                        {
                            if (currentTrollTraits == null)
                            {
                                throw new Exception("\"[/Troll]\" not in troll block.");
                            }
                            else
                            {
                                Console.WriteLine("{0} traits found, {1} traits total.", currentTrollTraits.Count, MasterTraitList.Count);
                                Console.WriteLine();

                                BaseTraits.Add(currentTrollTraits);
                                currentTrollTraits = null;
                            }
                        }
                        else if (line == "[Incompatibilities]")
                        {
                            incompatibility = true;
                        }
                        else if (line == "[EOF]")
                        {
                            break;
                        }
                        else if (incompatibility)
                        {
                            int n = line.IndexOf("<>");
                            if (n > 0)
                            {
                                string t1 = line.Remove(n).Trim();
                                string t2 = line.Substring(n + 2).Trim();
                                if (t1 == "" || t2 == "") throw new Exception("Invalid incompatibility.");

                                if (!ReverseMasterTraitList.ContainsKey(t1)) throw new Exception("Invalid trait in incompatibility: " + t1);
                                if (!ReverseMasterTraitList.ContainsKey(t2)) throw new Exception("Invalid trait in incompatibility: " + t2);

                                int id1 = ReverseMasterTraitList[t1];
                                int id2 = ReverseMasterTraitList[t2];

                                if (!IncompatbilityList.ContainsKey(id1)) IncompatbilityList.Add(id1, new List<int>());
                                IncompatbilityList[id1].Add(id2);

                                if (!IncompatbilityList.ContainsKey(id2)) IncompatbilityList.Add(id2, new List<int>());
                                IncompatbilityList[id2].Add(id1);
                            }
                        }
                        else if (currentTrollTraits != null)
                        {
                            line = line.Trim();

                            if (ReverseMasterTraitList.ContainsKey(line))
                            {
                                currentTrollTraits.Add(ReverseMasterTraitList[line]);
                            }
                            else
                            {
                                int traitId = MasterTraitList.Count;

                                MasterTraitList.Add(traitId, line);
                                ReverseMasterTraitList.Add(line, traitId);

                                currentTrollTraits.Add(traitId);
                            }
                        }
                    }
                }

                string outFile = Path.ChangeExtension(fileName, ".js");

                Console.WriteLine("File processed.  {0} trolls, {1} traits, {2} incompatibility entires", Trolls.Count, MasterTraitList.Count, IncompatbilityList.Count);
                Console.WriteLine("Outputting to {0}.", outFile);
                Console.WriteLine();

                using (StreamWriter sw = new StreamWriter(File.Open(outFile, FileMode.Create, FileAccess.ReadWrite)))
                {
                    sw.NewLine = "\n";
                    bool first;

                    sw.WriteLine("// This is an automatically generated file.");
                    sw.WriteLine("// See traits.txt for the source that produced this file.");
                    sw.WriteLine();

                    sw.WriteLine("window.Traits = {");

                    sw.Write("\t\"BaseTrolls\" : [\"");
                    sw.Write(string.Join("\", \"", Trolls.ToArray()));
                    sw.Write("\"],");
                    sw.WriteLine();

                    sw.Write("\t\"BloodColor\" : [[\"");
                    first = true;
                    foreach (string _ in BloodColors)
                    {
                        if (first) first = false; else sw.Write("\"], [\"");
                        sw.Write(_.Replace(", ", "\", \""));
                    }
                    sw.Write("\"]],");
                    sw.WriteLine();

                    sw.WriteLine("\t\"MasterTraitList\" : {");
                    first = true;
                    foreach (KeyValuePair<int, string> _ in MasterTraitList)
                    {
                        if (first) first = false; else sw.WriteLine(",");
                        sw.Write("\t\t{0} : \"{1}\"", _.Key, _.Value);
                    }
                    sw.WriteLine();
                    sw.WriteLine("\t },");
                    
                    sw.WriteLine("\t\"BaseTraits\" : [");
                    first = true;
                    foreach (List<int> _ in BaseTraits)
                    {
                        if (first) first = false; else sw.WriteLine(",");
                        sw.Write("\t\t[");

                        bool innerFirst = true;
                        foreach (int traitId in _)
                        {
                            if (innerFirst) innerFirst = false; else sw.Write(", ");

                            if (IncompatbilityList.ContainsKey(traitId))
                            {
                                List<string> incompatText = new List<string>();
                                foreach (int n in IncompatbilityList[traitId]) incompatText.Add(n.ToString());

                                sw.Write("[{0}, [{1}]]", traitId, string.Join(", ", incompatText.ToArray()));
                            }
                            else
                            {
                                sw.Write(traitId);
                            }
                        }

                        sw.Write("]");
                    }
                    sw.WriteLine();
                    sw.WriteLine("\t ]");

                    sw.WriteLine("}");
                }

            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex.Message);
            }
        }
        else
        {
            Console.Error.WriteLine("Cannot find file {0}.", fileName);
        }
    }
}


